/**
 * Dummy Test Data for Ophthalmology Module
 * Use this data to test the rendering in ViewPDF
 */
export const ophthalmologyTestData = {
    "visualAcuity": [
        {
            "eye": "OD",
            "ucDistance": "6",
            "ucNear": "6",
            "pinhole": "6",
            "cDistance": "6",
            "cNear": "6"
        },
        {
            "eye": "OS",
            "ucDistance": "6",
            "ucNear": "6",
            "pinhole": "6",
            "cDistance": "6",
            "cNear": "6"
        }
    ],
    "autoRefraction": [
        {
            "eye": "OD",
            "sphere": "-1.25",
            "cylinder": "-0.5",
            "axis": "180",
            "add": "0",
            "distance": "6",
            "near": "6",
            "type": "Undilated"
        },
        {
            "eye": "OS",
            "sphere": "-1.0",
            "cylinder": "-0.25",
            "axis": "170",
            "add": "0",
            "distance": "6",
            "near": "6",
            "type": "Undilated"
        },
        {
            "eye": "OD",
            "sphere": "-1.25",
            "cylinder": "-0.5",
            "axis": "180",
            "add": "0",
            "distance": "6",
            "near": "6",
            "type": "Dilated"
        },
        {
            "eye": "OS",
            "sphere": "-1.0",
            "cylinder": "-0.25",
            "axis": "170",
            "add": "0",
            "distance": "6",
            "near": "6",
            "type": "Dilated"
        }
    ],
    "lensometerValues": [
        {
            "eye": "OD",
            "sphere": "-1.0",
            "cylinder": "-0.5",
            "axis": "180",
            "add": "1.0",
            "distance": "6",
            "near": "6"
        },
        {
            "eye": "OS",
            "sphere": "-0.75",
            "cylinder": "-0.25",
            "axis": "170",
            "add": "1.0",
            "distance": "6",
            "near": "6"
        }
    ],
    "glassPrescription": [
        {
            "eye": "OD",
            "sphere": "-1.0",
            "cylinder": "-0.5",
            "axis": "180",
            "add": "1.0",
            "distance": "6",
            "near": "6"
        },
        {
            "eye": "OS",
            "sphere": "-0.75",
            "cylinder": "-0.25",
            "axis": "170",
            "add": "1.0",
            "distance": "6",
            "near": "6"
        }
    ],
    "pd": "32",
    "intraOcularPressure": [
        {
            "eye": "OD",
            "nct": "14",
            "gat": "15",
            "cc": "302",
            "ciop": "14"
        },
        {
            "eye": "OS",
            "nct": "13",
            "gat": "14",
            "cc": "302",
            "ciop": "13"
        }
    ],
    "slitLampExamination": [
        {
            "section": "Lids/Lacrimal Apparatus",
            "OD": "0",
            "OS": "0",
            "remarks": "Normal"
        },
        {
            "section": "Cornea",
            "OD": "0",
            "OS": "0",
            "remarks": "Clear"
        },
        {
            "section": "Lens",
            "OD": "1",
            "OS": "1",
            "remarks": "Early cataract"
        }
    ],
    "fundusExamination": [
        {
            "section": "Disc",
            "OD": "0",
            "OS": "0",
            "remarks": "Normal"
        },
        {
            "section": "Macula",
            "OD": "0",
            "OS": "0",
            "remarks": "Healthy"
        },
        {
            "section": "Periphery",
            "OD": "0",
            "OS": "0",
            "remarks": "No lesions"
        }
    ]
};
