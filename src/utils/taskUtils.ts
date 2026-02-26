// https://developer.mozilla.org/en-US/docs/Web/API/Crypto/randomUUID

//crypto.randomUUID() a crypto API that returns a cryptographically secure
//unique ID 

export const generatedUniqueId = (): string => {
    if (typeof crypto !== 'undefined' && crypto.randomUUID) return crypto.randomUUID();
    return Date.now().toString(3) + Math.random().toString(7).substring(2);
};

// Intl.DateTimeFormat ('fr-FR', {}) format dates using french/U.S date 'en-US' conventions... format() format it
export const frmtDate = (isoString: string) : string => {
    const date = new Date(isoString);
    return new Intl.DateTimeFormat('en-US', {
        day: 'numeric',
        month: 'short',
        year: 'numeric'
    }).format(date);
};

export const isValidText = (text: string) : boolean => {
    return text.trim().length >0;
}
