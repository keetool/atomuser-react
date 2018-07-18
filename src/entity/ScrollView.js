class ScrollView {
    id = null;
    distance = 0;
    handle = null;

    constructor(id, handle, distance = 500) {
        this.id = id;
        this.handle = handle;
        this.distance = distance;
    }


    addEventScroll = () => {
        document.addEventListener('scroll', this.trackScrolling);
    };

    trackScrolling = () => {
        const wrappedElement = document.getElementById(this.id);
        if (this.isBottom(wrappedElement)) {
            if (this.handle) {
                this.handle();
            }
            document.removeEventListener('scroll', this.trackScrolling);
        }
    };

    isBottom = (el) => {
        return el && el.getBoundingClientRect && el.getBoundingClientRect()
            && el.getBoundingClientRect().bottom - this.distance <= window.innerHeight;
    };
}

export default ScrollView;