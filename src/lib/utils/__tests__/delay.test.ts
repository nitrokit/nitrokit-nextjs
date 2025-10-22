import { describe, it, expect, vi, beforeEach } from 'vitest';
import { delay } from '../delay';

// Sahte zamanlayıcıları kullanmaya başlıyoruz
vi.useFakeTimers();

describe('delay utility', () => {
    // Her testten önce zamanlayıcıları sıfırla
    beforeEach(() => {
        vi.clearAllTimers();
    });

    it('should wait for the specified amount of time before resolving', async () => {
        const waitTime = 3000; // 3 saniye

        // 1. İşlemin tamamlanıp tamamlanmadığını takip eden bir Promise oluşturma
        const delayPromise = delay(waitTime);

        // 2. İşlemin henüz tamamlanmadığını kontrol etme (Zaman ilerlemedi)
        // Promise'i beklemeden hemen sonraki kod çalışır.
        let resolved = false;
        delayPromise.then(() => {
            resolved = true;
        });

        // Promise'in hemen çözülmediğini garanti ederiz.
        // vi.runAllTimers() çağrılmadan hemen önce çözülmemelidir.
        expect(resolved).toBe(false);

        // 3. Zamanı beklenen süre kadar manuel olarak ilerletme
        // Bu, gerçek 3 saniye beklemek yerine zamanı anında ilerletir.
        vi.advanceTimersByTime(waitTime);

        // 4. Promise'in çözüldüğünü (resolved) ve işlemin bittiğini kontrol etme
        await delayPromise; // Promise'in çözümünü bekleriz

        // İşlemin bittiğini teyit ederiz.
        expect(resolved).toBe(true);
    });

    it('should correctly handle a very short delay (10ms)', async () => {
        const waitTime = 10;
        const delayPromise = delay(waitTime);

        let resolved = false;
        delayPromise.then(() => {
            resolved = true;
        });

        expect(resolved).toBe(false);

        // 10ms ilerlet
        vi.advanceTimersByTime(waitTime);
        await delayPromise;

        expect(resolved).toBe(true);
    });
});
