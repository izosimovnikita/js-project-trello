import Factory from "../../modules/Factory";


export default class ThemeSwitcher extends Factory {
    constructor(state, props) {
        super(props);

        this.themes = state.themes;
        this.activeTheme = 'default';
        this.hasLocalStorage = typeof Storage !== 'undefined';
    }

    setTheme(id) {
        this.activeTheme = id;
        document.documentElement.setAttribute('data-theme', id);

        window.location.reload()

        if (this.hasLocalStorage) {
            localStorage.setItem('theme', id)
        }
    }

    render() {
        const themeSwitcher = new Factory('ul', {className: 'theme-switcher'}).render();

        this.themes.forEach(theme => {
            const themeItem = new Factory('li', {className: 'theme-switcher__item switcher-item'},
                [new Factory('button', {
                        className: 'switcher-item__button switcher-button',
                        dataId: theme.id,
                        style: `background-color: ${theme.colors.background}`,
                        onClick: () => this.setTheme(theme.id)
                    },
                    [new Factory('span', {
                        className: 'switcher-button__name',
                        style: `color: ${theme.colors.text}`
                    }).render(),
                        new Factory('span', {className: 'switcher-button__palette switcher-palette'},
                            [
                                new Factory('span', {
                                    className: 'switcher-palette__hue',
                                    style: `background-color: ${theme.colors.primary}`
                                }, ).render(),
                                new Factory('span', {
                                    className: 'switcher-palette__hue',
                                    style: `background-color: ${theme.colors.secondary}`
                                }).render(),
                                new Factory('span', {
                                    className: 'switcher-palette__hue',
                                    style: `background-color: ${theme.colors.border}`
                                }).render(),
                                new Factory('span', {
                                    className: 'switcher-palette__hue',
                                    style: `background-color: ${theme.colors.text}`
                                }).render(),
                                new Factory('span', {
                                    className: 'switcher-palette__hue',
                                    style: `background-color: ${theme.colors.column}`
                                }).render(),
                                new Factory('span', {
                                    className: 'switcher-palette__hue',
                                    style: `background-color: ${theme.colors.shadow}`
                                }).render()
                            ]
                        ).render()
                    ]
                ).render()]
            ).render();

            themeSwitcher.append(themeItem);
        })

        return themeSwitcher;
    }
}