import React, {useEffect, useState} from 'react'
import './ListPage.scss'
import {useParams} from "react-router"
import globals from "../../globals";
import DashboardStats from "../DashboardStats/DashboardStats";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons'
import KeyboardScanner from "../KeyboardScanner/KeyboardScanner";

const ListPage = () => {
    const {id} = useParams()
    const [list, setList] = useState()
    const [entries, setEntries] = useState([])

    useEffect(() => {
        loadListData()
        loadEntriesData()
    }, [])

    function loadListData() {
        fetch(`${globals.API_URL}/listings/${id}`, {
        })
            .then(res => res.json())
            .then(res => {
                //console.log(res)
                if(res.status) {
                    //console.log(res.data)
                    setList({
                        ...res.data,
                        insertion_date: new Date(res.data.insertion_date)
                    })
                }
            })
            .catch(err => {
                console.log(err)
            })
    }

    function loadEntriesData() {
        fetch(`${globals.API_URL}/listings/${id}/entries`, {
        })
            .then(res => res.json())
            .then(res => {
                if(res.status) {
                    setEntries(res.data.map(entry => ({
                        ...entry,
                        scanned: +entry.scanned
                    })))
                }
            })
            .catch(err => {
                console.log(err)
            })
    }


    return (
        <div className="ListPage">
            <KeyboardScanner entries={entries}/>

            <div className="container">
                {list && (
                    <div>
                        <h1>
                            {list.listing_name}
                            <small>Inserita in data {list.insertion_date.getDate()}/{list.insertion_date.getMonth()+1}/{list.insertion_date.getFullYear()}</small>
                        </h1>
                    </div>
                )}

                {entries && (
                    <div>
                        <DashboardStats showRemaining={true} stats={{entries: entries.length, scanned: entries.filter(e => e.scanned).length}}/>
                        <div className="progress">
                            <div className="progress-bar progress-bar-striped progress-bar-animated" role="progressbar"
                                style={{width: (entries.filter(e => e.scanned).length / entries.length * 100) + '%'}} />
                        </div>

                        <table className="table table-sm">
                            <thead>
                                <tr>
                                    <th>Data e Ora</th>
                                    <th>Codice</th>
                                    <th>Nome</th>
                                    <th>Codice Fiscale</th>
                                    <th>Telefono</th>
                                    <th className="text-center">Presenza</th>
                                </tr>
                            </thead>
                            <tbody>
                            {entries.map((entry, key) => (
                                <tr key={key} className={ entry.scanned ? 'table-success' : '' }>
                                    <td>{entry.entry_date}</td>
                                    <td className="text-monospace">{entry.code}</td>
                                    <td>{entry.name}</td>
                                    <td className="text-monospace">{entry.fc}</td>
                                    <td className="text-monospace">{entry.phone}</td>
                                    <td className="text-center">
                                        {entry.scanned ? (<FontAwesomeIcon icon={faCheck} />) : ''}
                                    </td>
                                </tr>
                            ))}
                            </tbody>

                        </table>
                    </div>
                )}
            </div>
        </div>
    )
}

export default ListPage


