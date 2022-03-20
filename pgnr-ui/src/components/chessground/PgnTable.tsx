import React, { useEffect, useState } from 'react'
import * as cg from 'chessground/types';

import { ChessInstance } from '../ChessJsTypes'

type PgnLine = { no: number, white: cg.Key, black?: cg.Key}

export default function PgnTable({ game }: { game: ChessInstance }) {
  const [pgn, setPgn] = useState<string>('');
  const [lines, setLines] = useState<PgnLine[]>([]);

  useEffect(() => {
    setPgn(game.pgn({
      max_width: 2,
      newline_char: '|'
    }))
  }, [game])

  useEffect(() => {
    const parsed = !pgn? [] : pgn.split('|').map((line) => {
      const split = line.split(' ')
      return {
        no: parseInt(split[0], 10),
        white: split[1] as cg.Key,
        black: split[2] as cg.Key || undefined
      } 
    })
    setLines(parsed)
  }, [pgn])

  const nbsp = (amount: number, text: string = '') => {
    const length = amount - text.length
    return new Array(length > 0 ? length : 0).fill('').map((_) => { return (<>&nbsp;</>)})
  }
  const nbsp3 = (text?: string) => {
    return nbsp('999'.length, text)
  }
  const nbsp7 = (text?: string) => {
    return nbsp('bxa8=Q+'.length, text)
  }

  return (<div className="bg-blue-gray-500" style={{ width: '200px', borderRadius: '4px' }}>
      <table className="w-full">
      <tbody>
        {lines.map((line, index) => {
          return (<tr key={index} className="text-sm font-mono">
            <th className="border-b border-gray-200 align-middle px-1 py-1 text-center">{nbsp3(`${line.no}`)}{line.no}.</th>
            <td className="border-b border-gray-200 align-middle px-1 py-1 text-left">{line.white}{nbsp7(line.white)}</td>
            <td className="border-b border-gray-200 align-middle px-1 py-1 text-left">{line.black}{nbsp7(line.white)}</td>
          </tr>)
        })}
      </tbody>
      </table>
    </div>
  )

}