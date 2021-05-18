import React, {useContext, useEffect, useState} from 'react'
import './ListPage.scss'
import {useParams} from "react-router"
import DashboardStats from "../DashboardStats/DashboardStats";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faCheck, faUpload, faSyringe} from '@fortawesome/free-solid-svg-icons'
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

    const def = (text, alt = '-') => text ? text : alt
    const parseDDMMYYYDate = (string) => {
        const [day, time] = string.split(' ')
        const [date, month, year] = day.split('/')
        return new Date(`${year}/${month}/${date} ${time}`) // get from date without timestamp
    }

    function loadListData() {
        getListing(id, auth)
            .then(res => setList(res))
    }

    function loadEntriesData() {
        setLoadingEntries(true)
        getEntries(id, auth)
            .then(res => {

                try {
                    res.sort((a, b) => parseDDMMYYYDate(a.entry_date) < parseDDMMYYYDate(b.entry_date))
                } catch(err) {}

                setEntries(res)
            })
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
                            <small><FontAwesomeIcon icon={faUpload}/> {list.insertion_date.getDate()}/{list.insertion_date.getMonth()+1}/{list.insertion_date.getFullYear()}</small>
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
                                <td data-label="Data e Ora">{def(entry.entry_date)}</td>
                                <td data-label="Codice" className="text-monospace">{def(entry.code)}</td>
                                <td data-label="Nome">{def(entry.name)}</td>
                                <td data-label="CF" className="text-monospace">{def(entry.fc)}</td>
                                <td data-label="Telefono" className="text-monospace">{def(entry.phone)}</td>
                                <td data-label="Presenza" className="text-center">
                                    {entry.scanned ? (<FontAwesomeIcon icon={faCheck} />) : '-'}
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>

                    {loadingEntries && (
                        <div className="loading">
                            <FontAwesomeIcon icon={faSyringe} spin />
                            <span>Carico...</span>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default ListPage


