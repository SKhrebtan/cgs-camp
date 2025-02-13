import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { TOKEN_KEY } from '~/common/constants/token-key';
export class HttpService {
	baseUrl: string;
	fetchingService: AxiosInstance;
	apiVersion: string;
	constructor(
		baseUrl = process.env.BASE_URL,
		fetchingService = axios,
		apiVersion = 'api',
	) {
		this.baseUrl = baseUrl;
		this.fetchingService = fetchingService;
		this.apiVersion = apiVersion;
	}

	private getFullApiUrl(url): string {
		return `${this.baseUrl}/${this.apiVersion}/${url}`;
	}

	private populateTokenToHeaderConfig(): object {
		const token = JSON.parse(localStorage.getItem(TOKEN_KEY));
		return {
			Authorization: token ? `Bearer ${token}` : '',
		};
	}

	private extractUrlAndDataFromConfig({
		_data,
		_url,
		...configWithoutDataAndUrl
	}): AxiosRequestConfig {
		return configWithoutDataAndUrl;
	}

	get(config, withAuth = true): Promise<AxiosResponse> {
		if (withAuth) {
			config.headers = {
				...config.headers,
				...this.populateTokenToHeaderConfig(),
			};
		}
		return this.fetchingService.get(
			this.getFullApiUrl(config.url),
			this.extractUrlAndDataFromConfig(config),
		);
	}

	put(config, withAuth = true): Promise<AxiosResponse> {
		if (withAuth) {
			config.headers = {
				...config.headers,
				...this.populateTokenToHeaderConfig(),
			};
		}
		return this.fetchingService.put(
			this.getFullApiUrl(config.url),
			config.data,
			this.extractUrlAndDataFromConfig(config),
		);
	}

	delete(config, withAuth = true): Promise<AxiosResponse> {
		if (withAuth) {
			config.headers = {
				...config.headers,
				...this.populateTokenToHeaderConfig(),
			};
		}
		return this.fetchingService.delete(
			this.getFullApiUrl(config.url),
			this.extractUrlAndDataFromConfig(config),
		);
	}

	post(config, withAuth = true): Promise<AxiosResponse> {
		if (withAuth) {
			config.headers = {
				...config.headers,
				...this.populateTokenToHeaderConfig(),
			};
		}
		return this.fetchingService.post(
			this.getFullApiUrl(config.url),
			config.data,
			this.extractUrlAndDataFromConfig(config),
		);
	}
}
