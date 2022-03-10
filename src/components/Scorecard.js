import axios from "axios";
import { useEffect, useState } from "react";
import config from '../config';

import '../styles/scorecard.scss';

export default function Scorecards({ data }) {

    const [selectedRound, setSelectedRound] = useState(1);

    const [par, setPar] = useState(null);
    const [round1, setRound1] = useState(null);
    const [round2, setRound2] = useState(null);
    const [round3, setRound3] = useState(null);
    const [round4, setRound4] = useState(null);

    useEffect(() => {
        const params = {
            parId: data.parId,
            round1Id: data.round1Id,
            round2Id: data.round2Id,
            round3Id: data.round3Id,
            round4Id: data.round4Id,
        }
        axios.post(config.url + "/get-scorecard", params).then((result) => {
            setPar(result.data.find(round => round.round_number === 0))
            setRound1(result.data.find(round => round.round_number === 1))
            setRound2(result.data.find(round => round.round_number === 2))
            setRound3(result.data.find(round => round.round_number === 3))
            setRound4(result.data.find(round => round.round_number === 4))  
        })
    }, [data])

    const buildMenu = () => {
        let margin = '';
        if (selectedRound === 1) {
            margin = '0 75% 0 0';
        } else if (selectedRound === 2) {
            margin = '0 25% 0 0';
        } else if (selectedRound === 3) {
            margin = '0 -25% 0 0';
        } else if (selectedRound === 4) {
            margin = '0 -75% 0 0';
        }
        return (
            <>
                <div className="scorecardMenu">
                    <h3 className="roundHeader" onClick={() => setSelectedRound(1)}>Round 1</h3>
                    <h3 className="roundHeader" onClick={() => setSelectedRound(2)}>Round 2</h3>
                    <h3 className="roundHeader" onClick={() => setSelectedRound(3)}>Round 3</h3>
                    <h3 className="roundHeader" onClick={() => setSelectedRound(4)}>Round 4</h3>
                </div>
                <div className="sliderBox">
                    <div className="slider" style={{ margin: `${margin}` }}/>
                </div>
            </>
        )
    }

    const buildCard = () => {
        return (
            <table className="cardTable">
                <thead>
                    <tr>
                        <th>Hole</th>
                        <th>1</th>
                        <th>2</th>
                        <th>3</th>
                        <th>4</th>
                        <th>5</th>
                        <th>6</th>
                        <th>7</th>
                        <th>8</th>
                        <th>9</th>
                        <th>10</th>
                        <th>11</th>
                        <th>12</th>
                        <th>13</th>
                        <th>14</th>
                        <th>15</th>
                        <th>16</th>
                        <th>17</th>
                        <th>18</th>
                        <th>Total</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Par</td>
                        {
                            buildRow(par)
                        }
                    </tr>
                    <tr>
                        <td>Score</td>
                        { selectedRound === 1 ? buildRow(round1) : "" }
                        { selectedRound === 2 ? buildRow(round2) : "" }
                        { selectedRound === 3 ? buildRow(round3) : "" }
                        { selectedRound === 4 ? buildRow(round4) : "" }
                    </tr>

                </tbody>
            </table>
        )
    }

    const buildRow = (rowData) => {

        if (rowData) {
            return (
                <>
                    {
                        Object.keys(rowData).map((hole, index) => {
                            const keyString = "hole_" + (index + 1)
                            const overUnderColor = (par[keyString] - rowData[keyString]).toString();
                            if (index + 1 <= 18) {
                                return <td style={{ backgroundColor: `${colors[overUnderColor]}` }}>{rowData[keyString]}</td>
                            } else {
                                return null;
                            }
                        })
                    }
                    <td>
                        {
                            Object.keys(rowData).reduce((sum, current, index) => {
                                const keyString = "hole_" + (index + 1)
                                if (index + 1 <= 18) {
                                    return sum + rowData[keyString];
                                } else {
                                    return sum;
                                }
                            }, 0)
                        }
                    </td>
                </>
            )
        }
    }

    return (
        <div className="scorecard">
            {
                buildMenu()
            }
            <div className="scorecardTable">
                {
                    buildCard()
                }
            </div>
        </div>
    )
}

const colors = {
    '-2': 'rgba(233, 233, 6, .7)',
    '-1': 'rgba(246, 6, 6, .5)',
    '0': 'transparent',
    '1': 'rgba(6, 214, 6, 0.5)',
    '2': 'rgba(9, 109, 231, .5)',
}