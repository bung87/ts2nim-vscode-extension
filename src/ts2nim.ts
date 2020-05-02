interface Replacement {
    regexp: RegExp;
    replacement: string;
}

const replacements: Replacement[] = [
    {

        regexp: /^\s*\/*\*+\/?/gm,
        replacement: "#"
    }, {
        regexp: /type\s([A-Z]+[a-z])\s+=\s\{/g,
        replacement: "type $1 = object of RootObj"
    }, {
        regexp: /\}/g,
        replacement: ""
    }, {
        regexp: /\*\//g,
        replacement: ""
    }, {
        regexp: /\?:/g,
        replacement: ":"
    }, {
        regexp: /type:\s*([a-z]+)/g,
        replacement: "typ:$1"
    }, {
        regexp: /(\s*)\/\//g,
        replacement: "$1#"
    },
    {
        regexp: /(?:export\s+)const\s+(\w+)\s=\s+(async\s+)?\(/gm,
        replacement: "proc $1*("
    },
    {
        regexp: /const\s+(\w+)\s=\s+(async\s+)?\(/gm,
        replacement: "proc $1("
    }, {
        regexp: /^export\s+([^=]+)\s+=/gm,
        replacement: "$1* ="
    }, {
        regexp: /([a-z]+)\[\]/g,
        replacement: "seq[$1]"
    }, {
        regexp: /number/g,
        replacement: "int"
    }, {
        regexp: /=>\s+\{/g,
        replacement: "="
    }, {
        regexp: /Promise<([a-z]+)>/g,
        replacement: "Future[$1]{.async.}"
    }, {
        regexp: /for\s*\((\w+)?\s(\w+)\sof\s(\w+)\)\s*\{/g,
        replacement: "for $2 in $3: "
    }, {
        regexp: /^\s*#$/g,
        replacement: ""
    }, {
        regexp: /\.length/g,
        replacement: ".len"
    }, {

        regexp: /\{/g,
        replacement: ":"
    }
    , {
        regexp: /\n{3,}/g,
        replacement: "\n\n"
    }
];

export function convert(s: string): string {
    // @ts-ignore
    return replacements.reduce((p, c: Replacement) => {
        return (p as string).replace(c.regexp, c.replacement);
    }, s);
}