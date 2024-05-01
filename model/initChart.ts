import { find } from '@shared/utils/math';

interface DrawDataChart {
    readonly value: string;
    readonly category: string;
}

interface SettingsCanvas {
    readonly padding: number;
}

interface UserSettingsAxios {
    scaleList: Array<string>;
}

interface DerivedSettingsAxios {
    readonly stepBetween: number;
    readonly origin: number;
    readonly endpoint: number;
}

interface SettingsChart {
    canvas: SettingsCanvas;
    axios: {
        x: UserSettingsAxios;
        y: UserSettingsAxios;
    };
}

class initChart {
    private drawData: Array<DrawDataChart>;

    private canvas: HTMLCanvasElement;
    private ctx: CanvasRenderingContext2D;

    private canvasLayout: SettingsCanvas;

    private axiosDataUser: {
        x: UserSettingsAxios;
        y: UserSettingsAxios;
    };

    private axiosDataDerived: {
        x: DerivedSettingsAxios;
        y: DerivedSettingsAxios;
    };

    private readonly rowsCount: number;
    private readonly columnCount: number;

    private readonly canvasViewWidth: number;
    private readonly canvasViewHeight: number;

    constructor(
        canvas: HTMLCanvasElement,
        data: Array<DrawDataChart>,
        settings: SettingsChart,
    ) {
        //TODO Refactor constructor
        this.drawData = data;
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d')!;
        this.canvasLayout = settings.canvas;
        this.axiosDataUser = settings.axios;

        const { offsetWidth: widthWrapper, offsetHeight: heightWrapper } =
            this.canvas.parentElement!;

        this.rowsCount = this.axiosDataUser.y.scaleList.length - 1;
        this.columnCount = this.axiosDataUser.x.scaleList.length - 1;

        this.canvasViewWidth = this.calcViewAxisSizeWithEqualSpacing(
            widthWrapper,
            this.columnCount,
            this.canvasLayout.padding,
        );

        this.canvasViewHeight = this.calcViewAxisSizeWithEqualSpacing(
            heightWrapper,
            this.rowsCount,
            this.canvasLayout.padding,
        );

        this.axiosDataDerived = {
            x: {
                stepBetween: this.canvasViewWidth / this.columnCount,
                origin: this.canvasLayout.padding,
                endpoint: this.canvasViewWidth + this.canvasLayout.padding,
            },
            y: {
                stepBetween: this.canvasViewHeight / this.rowsCount,
                origin: this.canvasViewHeight + this.canvasLayout.padding,
                endpoint: this.canvasLayout.padding,
            },
        };

        this.init();
    }

    private calcViewAxisSizeWithEqualSpacing(
        axisSize: number,
        LineCount: number,
        padding: number,
    ): number {
        const roundedSize = Math.floor(axisSize);
        const sizeWithPadding = roundedSize - padding * 2;
        const result = find.lowDivisorNum(sizeWithPadding, LineCount);

        return result;
    }

    private init(): void {
        this.setCanvasSize();
        this.drawChart();
    }

    private setCanvasSize(): void {
        const { canvasViewHeight: height, canvasViewWidth: width } = this;
        const { padding } = this.canvasLayout;

        this.canvas.width = this.calcCanvasSize(width, padding);
        this.canvas.height = this.calcCanvasSize(height, padding);
    }

    private calcCanvasSize(axisSize: number, padding: number): number {
        return axisSize + padding * 2;
    }

    private drawChart(): void {
        this.ctx.lineWidth = 1;
        this.ctx.strokeStyle = '#000000';
        this.ctx.translate(0.5, 0.5);
        this.ctx.scale(1, 1);

        this.drawValueAxis();
        this.drawCategoryAxis();
    }

    private drawValueAxis(): void {
        const { x, y } = this.axiosDataDerived;
        const { scaleList } = this.axiosDataUser.y;

        this.ctx.font = 'normal 15px Helvetica, sans-serif';

        let yAxis = y.origin;
        let indexScaleList = 0;
        while (indexScaleList < scaleList.length) {
            this.ctx.beginPath();
            this.ctx.fillText(scaleList[indexScaleList], x.origin, yAxis);
            this.ctx.moveTo(x.origin, yAxis);
            this.ctx.lineTo(x.endpoint, yAxis);
            this.ctx.stroke();
            this.ctx.closePath();

            yAxis -= y.stepBetween;
            indexScaleList++;
        }
    }

    private drawCategoryAxis(): void {
        const { x, y } = this.axiosDataDerived;
        const { scaleList } = this.axiosDataUser.x;

        this.ctx.font = 'normal 15px Helvetica, sans-serif';

        let xAxis = x.origin;
        let indexScaleList = 0;
        while (indexScaleList < scaleList.length) {
            this.ctx.beginPath();
            this.ctx.fillText(scaleList[indexScaleList], xAxis, y.origin);
            this.ctx.moveTo(xAxis, y.origin);
            this.ctx.lineTo(xAxis, y.endpoint);
            this.ctx.stroke();
            this.ctx.closePath();

            xAxis += x.stepBetween;
            indexScaleList++;
        }
    }
}

export default initChart;
