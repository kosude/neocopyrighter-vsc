/*
 *   Copyright (c) 2023 Jack Bennett
 *   All rights reserved.
 *
 *   Please see the LICENCE file for more information.
 */

import { Licence } from "./licence";

/**
 * Interface describing an individual copyright holder (aka author) and their respective copyright date(s)
 */
export interface CopyrightHolder {
    /** Name of the copyright holder */
    name: string,
    /** String containing date or dates of copyright claim for this holder, e.g. "2015" or "2017-2021" - if null then current year is used */
    date?: string
}

/**
 * Interface containing data necessary to generate a copyright notice class.
 */
export interface CopyrightNoticeData {
    /** Array of authors */
    copyrightHolders: CopyrightHolder[];
    /** Licence information */
    licence: Licence;
    /** Should the licence body be included? */
    licenceFullForm: boolean;
    /** File name of a licence file to include - undefined if none should be referenced */
    licenceFileName: string | undefined;
}

/**
 * A class representing a copyright notice.
 */
export class CopyrightNotice {
    /** Copyright notice data */
    private _data: CopyrightNoticeData;

    /** String to be presented as the copyright notice */
    public get text() { return this._text; }
    private _text: string;

    /** Whether or not to place 'All rights reserved' on a new line. */
    private _arrNewLine: boolean;

    /**
     * Generate a copyright notice class from the given data
     *
     * @param data Data to be presented as part of the notice text
     */
    public constructor(data: CopyrightNoticeData, arrNewLine: boolean) {
        this._data = data;
        this._arrNewLine = arrNewLine;
        this._text = this._generateText();
    }

    /**
     * Helper function to produce the text from the data for the notice
     */
    private _generateText(): string {
        let rtext: string = "";

        // add line for each author name + date
        if (this._data.copyrightHolders.length > 0) {
            this._data.copyrightHolders.forEach(author => {
                rtext += `${this._generateCopyrightHolderLine(author)}`;
            });

            if (this._arrNewLine) {
                rtext += "\n";
            } else {
                rtext += " ";
            }
        } else {
            rtext += "Copyright (c) - ";
        }

        rtext += "All Rights Reserved.";

        // if licence is specified
        if (this._data.licence.id !== "none") {
            rtext += "\n\n";

            if (this._data.licenceFullForm) {
                rtext += this._data.licence.body;
            } else {
                rtext += `This project is licenced under the ${this._data.licence.displayName}.`;
            }
        }

        // if licence file is to be included
        if (this._data.licenceFileName !== undefined) {
            rtext += "\n";

            // extra newline if license full form was included or if no licence was mentioned
            if (this._data.licenceFullForm || this._data.licence.id === "none") {
                rtext += "\n";
            }

            rtext += `See the ${this._data.licenceFileName} file for more information.`;
        }

        return rtext;
    }

    /**
     * Helper function to generate a string describing copyright holder and date given a `CopyrightHolder` object
     *
     * @param holder Author information
     * @returns Formatted string - no terminating new line
     */
    private _generateCopyrightHolderLine(holder: CopyrightHolder): string {
        const date: string = holder.date ?? new Date().getFullYear().toString();

        return `Copyright (c) ${date} ${holder.name}.`;
    }
}
