import React, {useEffect, useState} from 'react'
import './DashboardPage.scss'
import {Link} from "react-router-dom";
import DashboardStats from "../DashboardStats/DashboardStats";
import globals from "../../globals";

const DashboardPage = () => {
    const [stats, setStats] = useState() // {listings: 0, entries: 0, scanned: 0}
    const [listings, setListings] = useState([])

    useEffect(() => {
        loadDashboardData()
    }, [])

    return (
        <div className="DashboardPage">
            <div className="container">
                <h1>Dashboard</h1>

                <DashboardStats stats={stats} showListings={true}/>

                <h2>Liste</h2>

                <ul className="listings">
                    {listings.map((listing, key) => (
                        <li key={key}>
                            <Link to={`/list/${listing.listing_id}`}>
                            {listing.listing_name}
                            <small>Inserita in data {listing.insertion_date.getDate()}/{listing.insertion_date.getMonth()+1}/{listing.insertion_date.getFullYear()}</small>
                            </Link>
                        </li>
                    ))}
                </ul>

                {listings.length === 0 ? (
                    <div>
                      Non sono presenti liste. <Link to="/upload">Clicca qui</Link> per caricarne una
                    </div>
                ) : <></>}

            </div>
        </div>
    )

    function loadDashboardData() {
        fetch(`${globals.API_URL}/listings`)
            .then(res => res.json())
            .then(res => {
                if(res.status) {
                    setListings(res.data.map(l => ({
                        ...l,
                        insertion_date: new Date(l.insertion_date)
                    })))
                }
            })
    }
}

export default DashboardPage
