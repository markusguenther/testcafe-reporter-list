export default function () {
    return {
        noColors:           false,
        startTime:          null,
        afterErrList:       false,
        currentFixtureName: null,
        testCount:          0,

        reportTaskStart (startTime, userAgents, testCount) {
            var uaList = userAgents
                .map(ua => this.chalk.blue(ua))
                .join(', ');

            this.startTime = startTime;
            this.testCount = testCount;

            this.setIndent(0)
                .useWordWrap(true)
                .write(this.chalk.bold(`Running tests in: ${uaList}`))
                .newline()
                .newline();
        },

        reportFixtureStart (name) {
            this.currentFixtureName = name;
        },

        reportTestDone (name, errs, durationMs, unstable, screenshotPath) {
            var hasErr    = !!errs.length;
            var nameStyle = hasErr ? this.chalk.red : this.chalk.gray;
            var symbol    = hasErr ? this.chalk.red(this.symbols.err) : this.chalk.green(this.symbols.ok);

            name = `${this.currentFixtureName} - ${name}`;

            var title = `${symbol} ${nameStyle(name)}`;

            if (unstable)
                title += this.chalk.yellow(' (unstable)');

            if (screenshotPath)
                title += ` (screenshots: ${this.chalk.underline(screenshotPath)})`;

            this.setIndent(2)
                .write(title);

            if (hasErr) {
                this.setIndent(6)
                    .newline();

                errs.forEach((err, idx) => {
                    this.newline()
                        .write(this.formatError(err, `${idx + 1}) `))
                        .newline()
                        .newline();
                });
            }

            this.afterErrList = hasErr;

            this.newline();
        },

        reportTaskDone (endTime, passed) {
            var durationMs  = endTime - this.startTime;
            var durationStr = this.moment.duration(durationMs).format('h[h] mm[m] ss[s]');
            var footer      = passed === this.testCount ?
                              this.chalk.bold.green(`${this.testCount} passed`) :
                              this.chalk.bold.red(`${this.testCount - passed}/${this.testCount} failed`);

            footer += this.chalk.gray(` (${durationStr})`);

            this.setIndent(2)
                .useWordWrap(true);

            if (!this.afterErrList)
                this.newline();

            this.newline()
                .write(footer)
                .newline();
        }
    };
}