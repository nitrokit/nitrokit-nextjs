export type DataLayerItem = {
    event?: string;
    [key: string]: string | number | boolean | object | undefined;
};

export type Gtag = {
    (command: 'config', targetId: string, config?: GtagConfigParams): void;
    (command: 'event', action: GtagEventAction, parameters?: GtagEventParams): void;
    (command: 'consent', action: GtagConsentAction, parameters: GtagConsentParams): void;
    (command: 'js', date: Date): void;
    (command: 'set', parameters: GtagSetParams): void;
    (
        command: 'get',
        targetId: string,
        fieldName: string,
        callback?: (value: unknown) => void
    ): void;
};

export type GtagEventAction =
    | 'page_view'
    | 'login'
    | 'sign_up'
    | 'purchase'
    | 'search'
    | 'share'
    | 'click'
    | 'scroll'
    | 'file_download'
    | 'video_start'
    | 'video_complete'
    | 'add_to_cart'
    | 'begin_checkout'
    | 'generate_lead'
    | string;

export type GtagConsentAction = 'default' | 'update';

export type GtagConsentValue = 'granted' | 'denied';

export type CurrencyCode =
    | 'USD'
    | 'EUR'
    | 'GBP'
    | 'JPY'
    | 'AUD'
    | 'CAD'
    | 'CHF'
    | 'CNY'
    | 'SEK'
    | 'NZD'
    | 'MXN'
    | 'SGD'
    | 'HKD'
    | 'NOK'
    | 'TRY'
    | 'ZAR'
    | 'BRL'
    | 'INR'
    | 'KRW'
    | 'RUB'
    | string;

export interface GtagConfigParams {
    page_title?: string;
    page_location?: string;
    page_referrer?: string;
    send_page_view?: boolean;
    user_id?: string;
    user_properties?: Record<string, string | number | boolean>;
    custom_map?: Record<string, string>;
    currency?: CurrencyCode;
    debug_mode?: boolean;
    cookie_domain?: string;
    cookie_expires?: number;
    cookie_prefix?: string;
    cookie_update?: boolean;
    cookie_flags?: string;
    conversion_id?: string;
    conversion_label?: string;
    campaign_source?: string;
    campaign_medium?: string;
    campaign_name?: string;
    campaign_term?: string;
    campaign_content?: string;
}

export interface GtagEventParams {
    event_category?: string;
    event_label?: string;
    value?: number;
    currency?: CurrencyCode;
    page_title?: string;
    page_location?: string;
    page_referrer?: string;
    user_id?: string;
    transaction_id?: string;
    item_id?: string;
    item_name?: string;
    item_category?: string;
    item_category2?: string;
    item_category3?: string;
    item_brand?: string;
    item_variant?: string;
    price?: number;
    quantity?: number;
    coupon?: string;
    discount?: number;
    items?: GtagItem[];
    content_type?: string;
    search_term?: string;
    file_extension?: string;
    file_name?: string;
    link_url?: string;
    video_title?: string;
    video_duration?: number;
    video_current_time?: number;
    video_percent?: number;
    description?: string;
    fatal?: boolean;
}

export interface GtagItem {
    item_id?: string;
    item_name?: string;
    item_category?: string;
    item_category2?: string;
    item_category3?: string;
    item_category4?: string;
    item_category5?: string;
    item_brand?: string;
    item_variant?: string;
    price?: number;
    quantity?: number;
    coupon?: string;
    discount?: number;
    index?: number;
    item_list_id?: string;
    item_list_name?: string;
    location_id?: string;
}

export interface GtagConsentParams {
    analytics_storage?: GtagConsentValue;
    ad_storage?: GtagConsentValue;
    ad_user_data?: GtagConsentValue;
    ad_personalization?: GtagConsentValue;
    functionality_storage?: GtagConsentValue;
    personalization_storage?: GtagConsentValue;
    security_storage?: GtagConsentValue;
    wait_for_update?: number;
    region?: string | string[];
}

export interface GtagSetParams {
    user_id?: string;
    user_properties?: Record<string, string | number | boolean>;
    custom_map?: Record<string, string>;
    developer_id?: Record<string, boolean>;
}
