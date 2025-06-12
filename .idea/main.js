// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});


async function loadAboutContent() {
    try {
        const response = await fetch("about-me.txt");
        if (response.ok) {
            const text = await response.text();
            const aboutContent = document.getElementById('about-content');

            // Sadala tekstu rindkopās un izveido HTML
            const paragraphs = text.split('\n\n').filter(p => p.trim());
            aboutContent.innerHTML = paragraphs
                .map(paragraph => `<p>${paragraph.trim()}</p>`)
                .join('');
        }else{
            console.log('nevar ieladet')
        }
    } catch (error) {
        console.log('Nevar ielādēt about-me.txt failu');
    }
}

// Ielādē saturu, kad lapa ir gatava
document.addEventListener('DOMContentLoaded', loadAboutContent);

// Contact form handling
function handleSubmit(event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const name = formData.get('name');
    const email = formData.get('email');
    const message = formData.get('message');

    // Here you would typically send the data to a server
    // For now, we'll just show an alert
    alert(`Paldies, ${name}! Tava ziņa ir saņemta. Es sazināšos ar tevi drīzumā!`);

    // Reset form
    event.target.reset();
}

// Add scroll effect to sections
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

document.querySelectorAll('.section').forEach(section => {
    observer.observe(section);
});
