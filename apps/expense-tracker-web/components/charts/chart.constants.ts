export const ChartFontFamily =
    '-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif';

export const TooltipTitleFont = {
    size: 16,
    weight: 600,
    family: ChartFontFamily
};
export const TooltipBodyFont = {
    size: 14,
    weight: 400,
    family: ChartFontFamily
};
export const LabelFont = {
    size: 12,
    weight: 700,
    family: ChartFontFamily
};

export const TooltipBaseSettings = {
    enabled: true,
    displayColors: false,
    mode: 'index',
    backgroundColor: '#ffffff',
    borderColor: '#052665',
    borderWidth: 1,
    titleColor: '#000',
    bodyColor: '#052665',
    titleFont: TooltipTitleFont,
    bodyFont: TooltipBodyFont
};

export const GridSettingsX = {
    display: false,
    borderColor: '#b3bdd0'
};

export const GridSettingsY = {
    drawBorder: false,
    borderDash: [5, 5],
    color: '#b3bdd0',
    drawTicks: false
};

export const TickSettings = {
    beginAtZero: true,
    color: '#607192',
    padding: 15,
    font: LabelFont
};
