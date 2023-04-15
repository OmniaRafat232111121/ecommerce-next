import React from 'react'
import { Footer, HeroBanner } from '../../components'

import {client} from '../../lib/client'
const Home = ({products,bannerData}) => {
  return (
   <>
  <HeroBanner heroBanner={bannerData.length&&bannerData[0]}/>
  {console.log(bannerData)}
   <div className='products-heading'>
   <h2>Best Seller Products</h2>
  <p>speaker There are many variations passages</p>
  <div className='proucts-container'>
    {products?.map((product)=>product.name)}


  </div>
   </div>
  <Footer/>
   </>
  )
}

export default Home
export const getServerSideProps=async()=>{
  const query="*[_type=='product']";
  const products=await client.fetch(query);

  const bannerQuery="*[_type == 'banner']";
  const bannerData=await client.fetch(bannerQuery);
  return{
    props:{products,bannerData}
  }
}