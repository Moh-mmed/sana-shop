import { NextPage } from 'next';
import Image from 'next/image';
import Layout from '../components/Layout/Layout';
import s from '../styles/about/About.module.css'

const About: NextPage = () => {
    const description = 'We are a fashion retailer offering a wide range of high-quality clothing for men,  women, and children. Our mission is to provide our customers with stylish and comfortable clothing that fits their lifestyle and budget. With a focus on sustainability and ethical production, we aim to create a more conscious and responsible fashion industry.'

  return (
    <Layout title='About' description={description}>
        <section className={s.root}>
            <div className={s.container}>
                <div className={s.intro}>
                    <h1 className={s.intro_heading}>About Our Store</h1>
                    <p className={s.intro_body}>{description}</p>
                </div>
                  
                <div className={s.story}>
                    <div className={s.story_imgWrapper}>
                        <div className={s.story_imgContainer}>
                        <Image src="https://images.unsplash.com/photo-1602306834394-6c8b7ea0ed9d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTB8fGFib3V0JTIwdXN8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60" alt="About Us"
                        fill
                        className={s.story_img} />
                        </div>
                    </div>
                    <div>
                        <h2 className={s.story_title}>Our Story</h2>
                        <p className={s.story_body}>Lorem   ipsum dolor sit amet, consectetur adipiscing elit. Sed ut odio nec massa commodo pulvinar. Ut condimentum consectetur mi, sit amet cursus turpis aliquet sit amet. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Donec ultrices enim eget tellus placerat ultrices. Vivamus vitae eleifend dolor, ut blandit nisi. Nam fringilla felis euismod massa tincidunt malesuada. Aenean ut elit vel elit convallis sollicitudin eget in mauris.</p>
                        <p className={s.story_body}>Duis eu lectus fermentum, commodo enim quis, bibendum sem. Praesent eu ipsum in nisi mollis commodo. Morbi molestie, lorem nec dapibus vehicula, augue felis commodo orci, sed bibendum dolor nisl in mauris. Nullam sollicitudin, augue vel commodo elementum, augue quam sollicitudin risus, quis feugiat nisi lacus vel nunc. Aenean consequat, mi eget vestibulum consectetur, risus ex egestas dolor, non rhoncus nisl quam non augue.</p>
                    </div>
                </div>
                  
                <div className={s.team}>
                    <h2 className={s.team_heading}>Our Team</h2>
                    <div className={s.team_members}>
                        <div className={s.team_member}>
                            <Image src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60" 
                            alt="Team Member 1"
                            width={100}
                            height={100}
                            className={s.team_member_img} />
                              
                            <h3 className={s.team_member_name}>John Smith</h3>
                            <p className={s.team_member_profession}>Founder & CEO</p>
                        </div>
                        <div className={s.team_member}>
                            <Image src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nnx8dXNlcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60" 
                            alt="Team Member 2"
                            width={100}
                            height={100}
                            className={s.team_member_img} />
                                
                            <h3 className={s.team_member_name}>Jane Doe</h3>
                            <p className={s.team_member_profession}>Designer</p>
                        </div>
                        <div className={s.team_member}>
                            <Image src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MzB8fHVzZXJ8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60" 
                            alt="Team Member 3"
                            width={100}
                            height={100}
                            className={s.team_member_img}/>
                            <h3 className={s.team_member_name}>Mark Johnson</h3>
                            <p className={s.team_member_profession}>Marketing Manager</p>
                        </div>
                    </div>
                </div>
            </div>
      </section>
    </Layout>
  );
};
export default About;