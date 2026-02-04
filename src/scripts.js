const SITE_URL = 'https://meijertenzijthoff.nl';

function shareArticle(platform, title, url) {
    const fullUrl = SITE_URL + url;
    const encodedUrl = encodeURIComponent(fullUrl);
    const encodedTitle = encodeURIComponent(title);
    let shareUrl;
    
    switch(platform) {
        case 'whatsapp':
            shareUrl = `https://wa.me/?text=${encodedTitle}%20${encodedUrl}?wa=1`;
            break;
        case 'facebook':
            shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`;
            break;
        case 'twitter':
            shareUrl = `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`;
            break;
        case 'bluesky':
            shareUrl = `https://bsky.app/intent/compose?text=${encodedTitle}%20${encodedUrl}?bs=1`;
            break;
        case 'linkedin':
            shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`;
            break;
    }
    if (shareUrl) window.open(shareUrl, '_blank', 'width=600,height=400');
}

function copyArticleLink(url, button) {
    navigator.clipboard.writeText(SITE_URL + url);
    button.style.background = '#22c55e';
    button.style.color = 'white';
    setTimeout(() => { button.style.background = ''; button.style.color = ''; }, 2000);
}

function shareSiteWhatsApp() { window.open(`https://wa.me/?text=${encodeURIComponent(SITE_URL)}?wa=1`, '_blank'); }
function shareSiteFacebook() { window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(SITE_URL)}`, '_blank'); }
function shareSiteTwitter() { window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(SITE_URL)}`, '_blank'); }
function shareSiteBluesky() { window.open(`https://bsky.app/intent/compose?text=${encodeURIComponent(SITE_URL)}?bs=1`, '_blank'); }
function shareSiteLinkedIn() { window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(SITE_URL)}`, '_blank'); }
function copySiteLink(button) {
    navigator.clipboard.writeText(SITE_URL);
    button.style.background = 'var(--color-flame-mid)';
    setTimeout(() => { button.style.background = ''; }, 2000);
}

function submitContactForm(event) {
    event.preventDefault();
    const form = event.target;
    const naam = form.querySelector('#naam').value;
    const email = form.querySelector('#email').value;
    const bericht = form.querySelector('#bericht').value;
    const subject = encodeURIComponent(`Bericht van ${naam} via meijertenzijthoff.nl`);
    const body = encodeURIComponent(`Naam: ${naam}\nE-mail: ${email}\n\nBericht:\n${bericht}`);
    window.location.href = `mailto:p.tenzijthoff@gmail.com?subject=${subject}&body=${body}`;
}

