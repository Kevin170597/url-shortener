export const validateUrl = (url) => {
    return /^(ftp|http|https):\/\/[^ "]+$/.test(
        url
    );
};