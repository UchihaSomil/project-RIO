import React from 'react'
import Layout from '../core/Layout'


const Signup = () => (
    <Layout title="Sign up" description="Sign up to react node e commerce">
        {process.env.REACT_APP_API_URL}
    </Layout>)

export default Signup