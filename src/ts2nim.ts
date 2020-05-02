interface Replacement {
    regexp: RegExp | string ;
    replacement: string| Function;
}

const replacements: Replacement[] = [
    {

        regexp: /^\s*\/*\*+\/?/gm,
        replacement: "#"
    }, {
        regexp: /(?:export\s+)?type\s+(([A-Z]+[a-z]+)+)\s+=\s+\{/g,
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
        regexp: /Promise<([^>]+)>/g,
        replacement: "Future[$1]{.async.}"
    }, {
        regexp: /for\s*\((\w+)?\s(\w+)\sof\s(\w+)\)\s*\{/g,
        replacement: "for $2 in $3: "
    }, {
        regexp: /^\s*#\s*$/mg,
        replacement: ""
    }, {
        regexp: /\.length/g,
        replacement: ".len"
    }, {

        regexp: /\{$/mg,
        replacement: ":"
    }
    , {
        regexp: /\n{3,}/g,
        replacement: "\n\n"
    },{
        regexp:"!==",
        replacement:"!="
    },
    {
        regexp:"===",
        replacement:"=="
    },
    {
        regexp:/'([^']+)'/g,
        replacement:"\"$1\""
    },
    {
        regexp:/\(\n[^\)]+\)/mg,
        // @ts-ignore
        replacement: function(x,y,z:string) {
            console.log(x,y)
            return x.replace(/[\n\s]/g,"")
        }
    }
];

export function convert(s: string): string {
    // @ts-ignore
    return replacements.reduce((p, c: Replacement) => {
        // @ts-ignore
        return (p as string).replace(c.regexp, c.replacement);
    }, s);
}