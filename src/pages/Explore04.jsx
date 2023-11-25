import React, { useEffect, useState } from 'react';
import HeaderStyle2 from '../components/header/HeaderStyle2';
import Footer from '../components/footer/Footer';
import Explore from '../components/layouts/explore-04/Explore';
import widgetSidebarData from '../assets/fake-data/data-widget-sidebar'
import HeaderNew from '../components/header/HeaderNew';
import { ParticleComponent } from './ParticleComponent';
    
const Explore04 = () => {

    useEffect(() => {
        window.addEventListener('scroll', isSticky);
        return () => {
          window.removeEventListener('scroll', isSticky);
        };
      });
      const [onHeader, setOnHeader] = useState(false)
      const isSticky = (e) => {
        const header = document.querySelector('.js-header');
        const scrollTop = window.scrollY;
        scrollTop >= 300 ? header.classList.add('is-fixed') : header.classList.remove('is-fixed');
        scrollTop >= 400 ? header.classList.add('is-small') : header.classList.remove('is-small');

        // console.log(scrollTop)
      };

    return (
        <div className='explorePage'>
       {/* <ParticleComponent /> */} 
                  <HeaderNew search={true} setSearch={false} />

            <section className="flat-title-page">
                <div className="overlay"></div>
                <div className="themesflat-container">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="page-title-heading mg-bt-12">
                                <h1 className="heading text-center">Explore</h1>
                            </div>
                        </div>
                    </div>
                </div>                    
            </section>
            <Explore data={widgetSidebarData} />
            <Footer />
        </div>
    );
}

export default Explore04;
