import React, {useContext, useEffect, useState} from 'react'
import './ListPage.scss'
import {useParams} from "react-router"
import DashboardStats from "../DashboardStats/DashboardStats";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { faCheck, faSpinner } from '@fortawesome/free-solid-svg-icons'
import KeyboardScanner from "../KeyboardScanner/KeyboardScanner";
import {getListing} from "../../services/listingsService";
import {useAuth} from "../../auth";
import {getEntries, scanEntry} from "../../services/entriesService";

const ListPage = () => {
    const {id} = useParams()
    const [list, setList] = useState()
    const [entries, setEntries] = useState([])
    const [loadingEntries, setLoadingEntries] = useState(false)
    const auth = useAuth()

    useEffect(() => {
        loadListData()
        loadEntriesData()
    }, [id])

    function loadListData() {
        getListing(id, auth)
            .then(res => setList(res))
    }

    function loadEntriesData() {
        setLoadingEntries(true)
        getEntries(id, auth)
            .then(res => setEntries(res))
            .catch(err => {
                console.log(err)
                // TODO: handle errors
            })
            .finally(() => {
                setLoadingEntries(false)
            })
    }

    function confirmCode(entry) {
        scanEntry(entry.entry_id, auth)
            .then(() => {
                loadEntriesData()
                // TODO: edit offline data without fetching server
            })
            .catch(err => {
                console.error(err)
                // TODO: handle errors
            })
    }


    return (
        <div className="ListPage">
            <KeyboardScanner entries={entries} onConfirm={confirmCode}/>

            <div className="container">
                {list && (
                    <div>
                        <h1>
                            {list.listing_name}
                            <small>Inserita in data {list.insertion_date.getDate()}/{list.insertion_date.getMonth()+1}/{list.insertion_date.getFullYear()}</small>
                        </h1>
                    </div>
                )}

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

                    {loadingEntries && (
                        <div className="loading">
                            <FontAwesomeIcon icon={faSpinner} pulse />
                            <span>Carico...</span>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default ListPage


