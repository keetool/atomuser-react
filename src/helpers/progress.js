const clamp = (n, min, max) => {
    if (n < min) return min;
    if (n > max) return max;
    return n;
};

class Progress {
    minimum = 0.08;
    setState = null;
    value = null;
    key = '';
    config = {
        trickle: true,
        trickleRate: 0.02,
        trickleSpeed: 800,
    };

    init = (setState, key, config = {}) => {
        this.setState = setState;
        this.key = key;
        this.config = {...this.config, ...config};
    };

    start = () => {
        if (!this.value) this.set(0);

        if (this.config.trickle) {
            this.run = setInterval(() => {
                if (!this.isInited) return;
                this.trickle();
            }, this.config.trickleSpeed);
        }
    };

    inc = (amount) => {
        let n = this.value;

        if (!n) {
            return this.start();
        } else {
            if (typeof amount !== 'number') {
                amount = (1 - n) * clamp(Math.random() * n, 0.1, 0.95);
            }

            n = clamp(n + amount, 0, 0.994);
            return this.set(n);
        }
    };

    trickle = () => {
        this.inc(Math.random() * this.config.trickleRate);
    };

    set = (value) => {
        if (value <= this.minimum) {
            this.value = this.minimum;
        } else {
            this.value = value;
        }

        if (!this.isInited) return;

        this.setState({[this.key]: value});
    };

    isInited = () => {
        return this.setState && this.key;
    };

    done = () => {
        this.value = 1;

        if (!this.isInited) return;

        this.setState({[this.key]: 1});

        if (this.run) {
            clearInterval(this.run);
        }
    };
}

export default new Progress();



