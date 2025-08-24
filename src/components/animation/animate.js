export const fadeUp = {
    initial: {opacity: 0, y: 10},
    whileInView: {opacity: 1, y: 0 },
    transition: { duration: 0.5},
    viewport: {once: true}
}

export const fadeSteps = (duration = 0.5, delay = 0.2) => ({
    initial: { opacity: 0, y: 10 },
    whileInView: { 
        opacity: 1, 
        y: 0, 
        transition: { duration, delay }
    },
    viewport: { once: true }
});
