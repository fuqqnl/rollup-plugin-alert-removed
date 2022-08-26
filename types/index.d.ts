interface PluginOptions {
    include: string;
    exclude: string;
    extentions?: string[];
}
declare function alertCodeRemove(options: PluginOptions): {
    name: string;
    transform(code: string, id: string): string | undefined;
};
export default alertCodeRemove;
