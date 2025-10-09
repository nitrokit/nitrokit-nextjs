import { renderHook, act } from '@testing-library/react';
import { useNewsletterConfirmDialog } from '../useNewsletterConfirmDialog';
import { vi, describe, it, expect, MockInstance, beforeEach, afterEach } from 'vitest';
import { NewsletterConfirmResponseSchema } from '@/lib';

// 1. Next.js/i18n Navigation Hooklarını Mock'lama

const mockRouterReplace = vi.fn();
const mockSearchParamGet = vi.fn();

vi.mock('@/lib/i18n/navigation', () => ({
    useRouter: () => ({
        replace: mockRouterReplace
    })
}));

vi.mock('next/navigation', () => ({
    useSearchParams: () => ({
        get: mockSearchParamGet,
        toString: () => 'newsletter_confirm=TOKEN_123'
    })
}));

// 2. NewsletterConfirmResponseSchema Mock'u (Zod)
vi.mock('@/lib', () => ({
    // Mock'un doğru tipte olduğundan emin olmak için orijinal tipini kullanıyoruz
    NewsletterConfirmResponseSchema: {
        safeParse: vi.fn()
    }
}));

// 3. Global Fetch ve Translation Mock'ları
let fetchSpy: MockInstance;
let tMock: any;

const MOCK_SUCCESS_API_RESPONSE = {
    success: true,
    message: 'Mock confirmation successful.'
};

const MOCK_ERROR_API_RESPONSE = {
    success: false,
    error: 'Mock confirmation failed.'
};

describe('useNewsletterConfirmDialog Hook', () => {
    beforeEach(() => {
        vi.useFakeTimers();

        // Translation Mock'u
        tMock = vi.fn((key: string) => `T_${key}`);

        // Fetch Mock'u
        fetchSpy = vi.spyOn(global, 'fetch');

        // Varsayılan olarak token olmadığını varsayıyoruz.
        mockSearchParamGet.mockImplementation((key: string) =>
            key === 'newsletter_confirm' ? null : null
        );

        // Zod şemasını varsayılan başarılı yanıt için mock'luyoruz.
        (NewsletterConfirmResponseSchema.safeParse as any).mockReturnValue({
            success: true,
            data: MOCK_SUCCESS_API_RESPONSE
        });
    });

    afterEach(() => {
        vi.useRealTimers();
        vi.restoreAllMocks();
        mockRouterReplace.mockClear();
    });

    // --- SENARYO 1: BAŞLANGIÇ VE YÜKLEME ---

    it('should be initially closed and status should be null if no token is present', () => {
        const { result } = renderHook(() => useNewsletterConfirmDialog(tMock));

        expect(result.current.newsletterDialogOpen).toBe(false);
        expect(result.current.status).toBeNull();

        // API çağrılmamalı
        expect(fetchSpy).not.toHaveBeenCalled();
    });

    it('should open the dialog and set status to loading when a token is present', () => {
        // Token'ı mock'luyoruz
        mockSearchParamGet.mockImplementation((key: string) =>
            key === 'newsletter_confirm' ? 'TOKEN_123' : null
        );

        // Fetch promise'i asla resolve olmasın (loading durumunu görmek için)
        fetchSpy.mockReturnValue(new Promise(() => {}));

        const { result } = renderHook(() => useNewsletterConfirmDialog(tMock));

        expect(result.current.newsletterDialogOpen).toBe(true);
        expect(result.current.status).toBe('loading');

        // API çağrılmalı
        expect(fetchSpy).toHaveBeenCalledWith('/api/newsletter/confirm?token=TOKEN_123');
    });

    // --- SENARYO 2: BAŞARILI ONAY ---

    it('should handle API success, set status to success, and remove the URL query param', async () => {
        // Token'ı mock'luyoruz
        mockSearchParamGet.mockImplementation((key: string) =>
            key === 'newsletter_confirm' ? 'TOKEN_123' : null
        );

        // Fetch'i başarılı yanıtla resolve ediyoruz
        fetchSpy.mockResolvedValue({
            json: () => Promise.resolve(MOCK_SUCCESS_API_RESPONSE)
        });

        const { result } = renderHook(() => useNewsletterConfirmDialog(tMock));

        // Loading durumunda olduğundan emin ol
        expect(result.current.status).toBe('loading');

        // Promise'i resolve et ve useEffect'in içindeki kodu çalıştır
        await act(async () => {
            // Fetch promise'inin ve .then zincirinin bitmesini bekle
            vi.advanceTimersToNextTimer();
            await Promise.resolve();
        });

        // Durum ve mesaj güncellenmeli
        expect(result.current.status).toBe('success');
        expect(result.current.message).toBe(MOCK_SUCCESS_API_RESPONSE.message);

        // URL temizlenmeli. searchParams.toString()'den 'newsletter_confirm' silinince geriye sadece '?' kalır.
        expect(mockRouterReplace).toHaveBeenCalledWith('?', { scroll: false });
    });

    // --- SENARYO 3: İŞ MANTIĞI HATASI (API 200, Başarı: False) ---

    it('should handle business logic error, set status to error, and keep the URL query param', async () => {
        // Token'ı mock'luyoruz
        mockSearchParamGet.mockImplementation((key: string) =>
            key === 'newsletter_confirm' ? 'TOKEN_123' : null
        );

        // Zod mock'unu iş mantığı hatasına ayarlıyoruz
        (NewsletterConfirmResponseSchema.safeParse as any).mockReturnValue({
            success: true,
            data: MOCK_ERROR_API_RESPONSE
        });

        // Fetch'i başarılı HTTP yanıtıyla resolve ediyoruz
        fetchSpy.mockResolvedValue({
            json: () => Promise.resolve(MOCK_ERROR_API_RESPONSE)
        });

        const { result } = renderHook(() => useNewsletterConfirmDialog(tMock));

        await act(async () => {
            vi.advanceTimersToNextTimer();
            await Promise.resolve();
        });

        // Durum ve mesaj güncellenmeli
        expect(result.current.status).toBe('error');
        expect(result.current.message).toBe(MOCK_ERROR_API_RESPONSE.error);

        // URL değiştirilmemeli (hata durumunda dialog açık kalmalı)
        expect(mockRouterReplace).not.toHaveBeenCalled();
    });

    // --- SENARYO 4: FETCH/AĞ HATASI ---

    it('should handle network/fetch failure and set generic error message', async () => {
        // Token'ı mock'luyoruz
        mockSearchParamGet.mockImplementation((key: string) =>
            key === 'newsletter_confirm' ? 'TOKEN_123' : null
        );

        // Fetch'i bir hata ile reject ediyoruz
        fetchSpy.mockRejectedValue(new Error('Network Down'));

        const { result } = renderHook(() => useNewsletterConfirmDialog(tMock));

        await act(async () => {
            vi.advanceTimersToNextTimer();
            await Promise.resolve();
        });

        // Durum ve mesaj güncellenmeli
        expect(result.current.status).toBe('error');
        expect(result.current.message).toBe('T_app.errors.general');
    });

    // --- SENARYO 5: İKİNCİ ÇAĞRI ENGELLEME ---

    it('should not send request again if requestSent flag is true (on second render)', async () => {
        // Token'ı mock'luyoruz
        mockSearchParamGet.mockImplementation((key: string) =>
            key === 'newsletter_confirm' ? 'TOKEN_123' : null
        );

        // Fetch'i uzun süren bir Promise ile mock'luyoruz
        const longRunningFetch = new Promise(() => {});
        fetchSpy.mockReturnValue(longRunningFetch);

        // İlk render (requestSent: true, fetch 1 kez çağrılır)
        const { result, rerender } = renderHook(() => useNewsletterConfirmDialog(tMock));

        expect(fetchSpy).toHaveBeenCalledTimes(1);
        expect(result.current.status).toBe('loading');

        // İkinci kez render (requestSent hala true olduğu için)
        rerender();

        // Fetch tekrar çağrılmamalı
        expect(fetchSpy).toHaveBeenCalledTimes(1);
    });

    // --- SENARYO 6: onOpenChange HANDLER ---

    it('should clear the query param when onOpenChange is called with false', () => {
        const { result } = renderHook(() => useNewsletterConfirmDialog(tMock));

        act(() => {
            result.current.onOpenChange(false);
        });

        // URL temizlenmeli. searchParams.toString()'den 'newsletter_confirm' silinince geriye sadece '?' kalır.
        expect(mockRouterReplace).toHaveBeenCalledWith('?', { scroll: false });
    });
});
