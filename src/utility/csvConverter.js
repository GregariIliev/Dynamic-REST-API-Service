import { Parser } from 'json2csv';

export function csvConverter(file){
    const parser = new Parser();

    return parser.parse(file);
}