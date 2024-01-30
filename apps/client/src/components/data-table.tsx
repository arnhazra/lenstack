"use client"
import { Table } from "react-bootstrap"
import Hero from "./hero"

interface DataTableProps {
  tableName: string
  data: object[]
}

export default function DataTable({ tableName, data }: DataTableProps) {
  if (data.length === 0) {
    return (
      <Hero>
        <p className="lead">{tableName}</p>
        <p className="lead">No Data</p>
      </Hero>
    )
  }

  const columns = Object.keys(data[0]) as (keyof typeof data[0])[]

  return (
    <Hero>
      <p className="lead">{tableName}</p>
      <Table responsive hover variant="light">
        <thead>
          <tr>
            {columns.map((column) => (
              <th key={column}>{column}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index}>
              {columns.map((column) => (
                <td key={column}>{item[column]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </Table>
    </Hero>
  )
}
