import {
    Configuration,
    AuthApi,
    ProductsApi,
    DoctorsApi,
    HospitalsApi,
    AppointmentsApi,
    OrdersApi,
    CartApi,
    PackagesApi,
    AddressesApi,
    AmbulanceApi,
    HomeSampleApi,
    HomeCareApi,
    TelemedicineApi,
    WellbeingApi,
    PartnersApi,
    LookupApi,
    SessionRequest,
    SessionResponse
} from './';

/**
 * LifePlusClient - High-level wrapper for LifePlus Healthcare Platform API
 * 
 * This class provides a simplified interface to the LifePlus API with automatic
 * session management and convenient access to all API endpoints.
 * 
 * @version 3.1.0
 */
export class LifePlusClient {
    private config: Configuration;
    private accessToken?: string;
    private sessionData?: SessionResponse;
    private partnerId?: string;
    private partnerApiKey?: string;
    
    // API instances
    private authApiInstance?: AuthApi;
    private productsApiInstance?: ProductsApi;
    private doctorsApiInstance?: DoctorsApi;
    private hospitalsApiInstance?: HospitalsApi;
    private appointmentsApiInstance?: AppointmentsApi;
    private ordersApiInstance?: OrdersApi;
    private cartApiInstance?: CartApi;
    private packagesApiInstance?: PackagesApi;
    private addressesApiInstance?: AddressesApi;
    private ambulanceApiInstance?: AmbulanceApi;
    private homeSampleApiInstance?: HomeSampleApi;
    private homeCareApiInstance?: HomeCareApi;
    private telemedicineApiInstance?: TelemedicineApi;
    private wellbeingApiInstance?: WellbeingApi;
    private partnersApiInstance?: PartnersApi;
    private lookupApiInstance?: LookupApi;

    /**
     * Create a new LifePlusClient instance
     * 
     * @param baseUrl Base URL of the API (e.g., "https://api.lifeplusbd.com/api/v2")
     * @param options Additional configuration options
     */
    constructor(baseUrl: string, options: {
        accessToken?: string;
        headers?: Record<string, string>;
    } = {}) {
        this.config = new Configuration({
            basePath: baseUrl,
            accessToken: options.accessToken,
            headers: options.headers
        });
        
        if (options.accessToken) {
            this.accessToken = options.accessToken;
        }
    }

    /**
     * Set Partner API credentials (server-to-server).
     *
     * Uses the API v2 partner headers:
     * - X-API-Key
     * - X-Partner-ID
     */
    setPartnerCredentials(partnerId: string, apiKey: string): void {
        this.partnerId = partnerId;
        this.partnerApiKey = apiKey;

        this.config = new Configuration({
            basePath: this.config.basePath,
            accessToken: this.accessToken,
            headers: this.config.headers,
            apiKey: async (name: string) => {
                if (name === 'apiKeyAuth') return apiKey;
                if (name === 'partnerIdAuth') return partnerId;
                return '';
            },
        });

        this.resetApiInstances();
    }

    /**
     * Login with phone and password
     * 
     * @param phone Phone number (e.g., "01712345678")
     * @param password User password
     * @returns Session information with user data and token
     */
    async login(phone: string, password: string): Promise<SessionResponse> {
        const authApi = this.auth();
        const request: SessionRequest = {
            phone,
            password
        };
        
        this.sessionData = await authApi.createSession({ sessionRequest: request });
        
        if (this.sessionData.data?.token) {
            this.accessToken = this.sessionData.data.token;
            this.config = new Configuration({
                basePath: this.config.basePath,
                accessToken: this.accessToken,
                headers: this.config.headers
            });
            
            // Reset API instances to use new config
            this.resetApiInstances();
        }
        
        return this.sessionData;
    }

    /**
     * Verify phone number with OTP
     * 
     * @param phone Phone number
     * @param otp OTP code received via SMS
     * @returns Session information with user data and token
     */
    async verifyPhone(phone: string, otp: string): Promise<SessionResponse> {
        const authApi = this.auth();
        this.sessionData = await authApi.verifyPhone({ phone, otp });
        
        if (this.sessionData.data?.token) {
            this.accessToken = this.sessionData.data.token;
            this.config = new Configuration({
                basePath: this.config.basePath,
                accessToken: this.accessToken,
                headers: this.config.headers
            });
            
            // Reset API instances to use new config
            this.resetApiInstances();
        }
        
        return this.sessionData;
    }

    /**
     * Logout the current user
     */
    async logout(): Promise<void> {
        if (this.accessToken) {
            const authApi = this.auth();
            await authApi.logout();
            this.accessToken = undefined;
            this.sessionData = undefined;
            this.config = new Configuration({
                basePath: this.config.basePath,
                headers: this.config.headers
            });
            this.resetApiInstances();
        }
    }

    /**
     * Set authentication token manually
     * 
     * @param token Access token
     */
    setAccessToken(token: string): void {
        this.accessToken = token;
        this.config = new Configuration({
            basePath: this.config.basePath,
            accessToken: token,
            headers: this.config.headers
        });
        this.resetApiInstances();
    }

    /**
     * Get current access token
     * 
     * @returns Current access token or undefined if not authenticated
     */
    getAccessToken(): string | undefined {
        return this.accessToken;
    }

    /**
     * Get current session information
     * 
     * @returns Current session or undefined if not authenticated
     */
    getSession(): SessionResponse | undefined {
        return this.sessionData;
    }

    /**
     * Check if user is authenticated
     * 
     * @returns True if authenticated, false otherwise
     */
    isAuthenticated(): boolean {
        return this.accessToken !== undefined;
    }

    /**
     * Reset all API instances (used after config change)
     */
    private resetApiInstances(): void {
        this.authApiInstance = undefined;
        this.productsApiInstance = undefined;
        this.doctorsApiInstance = undefined;
        this.hospitalsApiInstance = undefined;
        this.appointmentsApiInstance = undefined;
        this.ordersApiInstance = undefined;
        this.cartApiInstance = undefined;
        this.packagesApiInstance = undefined;
        this.addressesApiInstance = undefined;
        this.ambulanceApiInstance = undefined;
        this.homeSampleApiInstance = undefined;
        this.homeCareApiInstance = undefined;
        this.telemedicineApiInstance = undefined;
        this.wellbeingApiInstance = undefined;
        this.partnersApiInstance = undefined;
        this.lookupApiInstance = undefined;
    }

    // API Accessors

    auth(): AuthApi {
        if (!this.authApiInstance) {
            this.authApiInstance = new AuthApi(this.config);
        }
        return this.authApiInstance;
    }

    products(): ProductsApi {
        if (!this.productsApiInstance) {
            this.productsApiInstance = new ProductsApi(this.config);
        }
        return this.productsApiInstance;
    }

    doctors(): DoctorsApi {
        if (!this.doctorsApiInstance) {
            this.doctorsApiInstance = new DoctorsApi(this.config);
        }
        return this.doctorsApiInstance;
    }

    hospitals(): HospitalsApi {
        if (!this.hospitalsApiInstance) {
            this.hospitalsApiInstance = new HospitalsApi(this.config);
        }
        return this.hospitalsApiInstance;
    }

    appointments(): AppointmentsApi {
        if (!this.appointmentsApiInstance) {
            this.appointmentsApiInstance = new AppointmentsApi(this.config);
        }
        return this.appointmentsApiInstance;
    }

    orders(): OrdersApi {
        if (!this.ordersApiInstance) {
            this.ordersApiInstance = new OrdersApi(this.config);
        }
        return this.ordersApiInstance;
    }

    cart(): CartApi {
        if (!this.cartApiInstance) {
            this.cartApiInstance = new CartApi(this.config);
        }
        return this.cartApiInstance;
    }

    packages(): PackagesApi {
        if (!this.packagesApiInstance) {
            this.packagesApiInstance = new PackagesApi(this.config);
        }
        return this.packagesApiInstance;
    }

    addresses(): AddressesApi {
        if (!this.addressesApiInstance) {
            this.addressesApiInstance = new AddressesApi(this.config);
        }
        return this.addressesApiInstance;
    }

    ambulance(): AmbulanceApi {
        if (!this.ambulanceApiInstance) {
            this.ambulanceApiInstance = new AmbulanceApi(this.config);
        }
        return this.ambulanceApiInstance;
    }

    homeSample(): HomeSampleApi {
        if (!this.homeSampleApiInstance) {
            this.homeSampleApiInstance = new HomeSampleApi(this.config);
        }
        return this.homeSampleApiInstance;
    }

    homeCare(): HomeCareApi {
        if (!this.homeCareApiInstance) {
            this.homeCareApiInstance = new HomeCareApi(this.config);
        }
        return this.homeCareApiInstance;
    }

    telemedicine(): TelemedicineApi {
        if (!this.telemedicineApiInstance) {
            this.telemedicineApiInstance = new TelemedicineApi(this.config);
        }
        return this.telemedicineApiInstance;
    }

    wellbeing(): WellbeingApi {
        if (!this.wellbeingApiInstance) {
            this.wellbeingApiInstance = new WellbeingApi(this.config);
        }
        return this.wellbeingApiInstance;
    }

    partners(): PartnersApi {
        if (!this.partnersApiInstance) {
            this.partnersApiInstance = new PartnersApi(this.config);
        }
        return this.partnersApiInstance;
    }

    lookup(): LookupApi {
        if (!this.lookupApiInstance) {
            this.lookupApiInstance = new LookupApi(this.config);
        }
        return this.lookupApiInstance;
    }
}

export default LifePlusClient;
