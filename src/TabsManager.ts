import { Tab } from './Tab';

export class TabsManager {
    private static instance: TabsManager;
    public static tabs: Tab[] = [];

    private constructor() { }

    public static getInstance() {
        if (!TabsManager.instance) {
            TabsManager.instance = new TabsManager();
        }

        return TabsManager.instance;
    }

    public static addTab(tab: Tab) {
        this.tabs.push(tab);
        tab.panel?.onDidDispose(() => {
            this.removeTab(tab);
        });
    }

    public static removeTab(tab: Tab) {
        this.tabs = this.tabs.filter(t => t !== tab);
    }

    public static focusTab(tabId: string): boolean {
        if (this.tabs.length === 0) return false;

        const tab = this.tabs.find(t => t.data?.id === tabId);
        if (!tab) return false;

        tab.panel?.reveal();
        return true;
    }
}

TabsManager.getInstance();