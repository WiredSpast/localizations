export const enum CountryCode {
  COM = 'com',
  COM_BR = 'com.br',
  COM_TR = 'com.tr',
  TR = 'tr',
  DE = 'de',
  ES = 'es',
  FI = 'fi',
  FR = 'fr',
  IT = 'it',
  NL = 'nl',
  SANDBOX = 'sandbox'
};

type Locations = {
  [keyof in CountryCode]?: {
    emoji_flag: string;
    language: string;
    locale: string;
    hotel: string;
  }
}

export const locations: Locations = {
  [CountryCode.ES]: {
    emoji_flag: "🇪🇸",
    language: "Español",
    locale: "es",
    hotel: "es"
  },
  [CountryCode.COM]: {
    emoji_flag: "🇬🇧",
    language: "English",
    locale: "en",
    hotel: "com"

  },
  [CountryCode.FR]: {
    emoji_flag: "🇫🇷",
    language: "Français",
    locale: "fr",
    hotel: "fr"
  },
  [CountryCode.COM_BR]: {
    emoji_flag: "🇧🇷",
    language: "Português",
    locale: "pt",
    hotel: "com.br"
  },
}
