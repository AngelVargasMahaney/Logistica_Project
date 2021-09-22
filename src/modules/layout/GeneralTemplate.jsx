import React from 'react'
import AdminSidebar from '../admin/components/AdminSidebar'
import GeneralNavBar from './GeneralNavBar'

const GeneralTemplate = () => {
    return (
        <>
            <AdminSidebar />
            <div className="home_content">
                <GeneralNavBar />
                <div className="text ml-4">Título</div>

                
            </div>

        </>
    )
}

export default GeneralTemplate
