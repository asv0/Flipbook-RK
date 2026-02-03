function reveal(event) {
    const container = event.currentTarget;
    const rect = container.getBoundingClientRect();
    
    const x = event.clientX - rect.left;
    
    const percentage = (x / rect.width) * 100;

    event.target.previousElementSibling.style.clipPath = `inset(0 0 0 ${percentage}%)`;
}