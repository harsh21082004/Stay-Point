"use client";
import React from 'react'
import styles from '@styles/customerDashboard.module.css'
import PropertiesCard from '@/app/components/Cards/PropertiesCard'
import { useAuthContext } from '@/app/context/AuthContext';
import ProfileIcon from '@/app/components/Profile/ProfileIcon';
import BlueLinkButton from '@/app/components/Buttons/BlueLinkButton';

export default function Dashboard() {

  const { isLoggedIn, session, logOut } = useAuthContext();

  interface User {
    picture: string;
    name: string;
    email: string;
  }

  interface Session {
    user: User;
  }

  const typedSession = session as Session;

  return (
    <div className={`${styles.dashboard}`}>
      <div className={`${styles.profile}`}>
        <div className={`${styles.header}`}>
          <h2>Hello, {typedSession?.user?.name.split(" ")[0]}</h2>
        </div>
        <div className={`${styles.profile_details}`}>
          <div className={`${styles.profile_info}`}>
            <div className={`${styles.profile_image}`}>
              {isLoggedIn && (<ProfileIcon size='100px' page="profile" typedSession={typedSession} logOut={logOut} />)}
            </div>
            <div className={`${styles.profile_info_details}`}>
              <h3>{typedSession?.user?.name}</h3>
              <p>{typedSession?.user?.email}</p>
            </div>
          </div>
          <div className={`${styles.profile_actions}`}>
            <BlueLinkButton buttonText="Edit Profile" href="/profile" />
          </div>
        </div>
      </div>
      {/* Recent Properties */}
      <div className={`${styles.dashboard_content}`}>
        <div className={`${styles.header_links}`}>
          
        </div>
      </div>
      {/* <div className={`${styles.recent} my-5`}>
        <div className={`${styles.header}`}>
          <h2>Recently Viewed</h2>
        </div>
        <div className={`${styles.cards}`}>
          <PropertiesCard name="Property Name" address="Property Address" price="Property Price" image="https://media.istockphoto.com/id/1390233984/photo/modern-luxury-bedroom.jpg?s=612x612&w=0&k=20&c=po91poqYoQTbHUpO1LD1HcxCFZVpRG-loAMWZT7YRe4=" />
          <PropertiesCard name="Property Name" address="Property Address" price="Property Price" image="https://media.istockphoto.com/id/1390233984/photo/modern-luxury-bedroom.jpg?s=612x612&w=0&k=20&c=po91poqYoQTbHUpO1LD1HcxCFZVpRG-loAMWZT7YRe4=" />
          <PropertiesCard name="Property Name" address="Property Address" price="Property Price" image="https://media.istockphoto.com/id/1390233984/photo/modern-luxury-bedroom.jpg?s=612x612&w=0&k=20&c=po91poqYoQTbHUpO1LD1HcxCFZVpRG-loAMWZT7YRe4=" />
          <PropertiesCard name="Property Name" address="Property Address" price="Property Price" image="https://media.istockphoto.com/id/1390233984/photo/modern-luxury-bedroom.jpg?s=612x612&w=0&k=20&c=po91poqYoQTbHUpO1LD1HcxCFZVpRG-loAMWZT7YRe4=" />
          <PropertiesCard name="Property Name" address="Property Address" price="Property Price" image="https://media.istockphoto.com/id/1390233984/photo/modern-luxury-bedroom.jpg?s=612x612&w=0&k=20&c=po91poqYoQTbHUpO1LD1HcxCFZVpRG-loAMWZT7YRe4=" />
          <PropertiesCard name="Property Name" address="Property Address" price="Property Price" image="https://media.istockphoto.com/id/1390233984/photo/modern-luxury-bedroom.jpg?s=612x612&w=0&k=20&c=po91poqYoQTbHUpO1LD1HcxCFZVpRG-loAMWZT7YRe4=" />
          <PropertiesCard name="Property Name" address="Property Address" price="Property Price" image="https://media.istockphoto.com/id/1390233984/photo/modern-luxury-bedroom.jpg?s=612x612&w=0&k=20&c=po91poqYoQTbHUpO1LD1HcxCFZVpRG-loAMWZT7YRe4=" />
          <PropertiesCard name="Property Name" address="Property Address" price="Property Price" image="https://media.istockphoto.com/id/1390233984/photo/modern-luxury-bedroom.jpg?s=612x612&w=0&k=20&c=po91poqYoQTbHUpO1LD1HcxCFZVpRG-loAMWZT7YRe4=" />
          <PropertiesCard name="Property Name" address="Property Address" price="Property Price" image="https://media.istockphoto.com/id/1390233984/photo/modern-luxury-bedroom.jpg?s=612x612&w=0&k=20&c=po91poqYoQTbHUpO1LD1HcxCFZVpRG-loAMWZT7YRe4=" />
          <PropertiesCard name="Property Name" address="Property Address" price="Property Price" image="https://media.istockphoto.com/id/1390233984/photo/modern-luxury-bedroom.jpg?s=612x612&w=0&k=20&c=po91poqYoQTbHUpO1LD1HcxCFZVpRG-loAMWZT7YRe4=" />
          <PropertiesCard name="Property Name" address="Property Address" price="Property Price" image="https://media.istockphoto.com/id/1390233984/photo/modern-luxury-bedroom.jpg?s=612x612&w=0&k=20&c=po91poqYoQTbHUpO1LD1HcxCFZVpRG-loAMWZT7YRe4=" />
        </div>
      </div>
      <div className={`${styles.recent} my-5`}>
        <div className={`${styles.header}`}>
          <h2>Saved Properties</h2>
        </div>
        <div className={`${styles.cards}`}>
          <PropertiesCard name="Property Name" address="Property Address" price="Property Price" image="https://media.istockphoto.com/id/1390233984/photo/modern-luxury-bedroom.jpg?s=612x612&w=0&k=20&c=po91poqYoQTbHUpO1LD1HcxCFZVpRG-loAMWZT7YRe4=" />
          <PropertiesCard name="Property Name" address="Property Address" price="Property Price" image="https://media.istockphoto.com/id/1390233984/photo/modern-luxury-bedroom.jpg?s=612x612&w=0&k=20&c=po91poqYoQTbHUpO1LD1HcxCFZVpRG-loAMWZT7YRe4=" />
          <PropertiesCard name="Property Name" address="Property Address" price="Property Price" image="https://media.istockphoto.com/id/1390233984/photo/modern-luxury-bedroom.jpg?s=612x612&w=0&k=20&c=po91poqYoQTbHUpO1LD1HcxCFZVpRG-loAMWZT7YRe4=" />
          <PropertiesCard name="Property Name" address="Property Address" price="Property Price" image="https://media.istockphoto.com/id/1390233984/photo/modern-luxury-bedroom.jpg?s=612x612&w=0&k=20&c=po91poqYoQTbHUpO1LD1HcxCFZVpRG-loAMWZT7YRe4=" />
          <PropertiesCard name="Property Name" address="Property Address" price="Property Price" image="https://media.istockphoto.com/id/1390233984/photo/modern-luxury-bedroom.jpg?s=612x612&w=0&k=20&c=po91poqYoQTbHUpO1LD1HcxCFZVpRG-loAMWZT7YRe4=" />
          <PropertiesCard name="Property Name" address="Property Address" price="Property Price" image="https://media.istockphoto.com/id/1390233984/photo/modern-luxury-bedroom.jpg?s=612x612&w=0&k=20&c=po91poqYoQTbHUpO1LD1HcxCFZVpRG-loAMWZT7YRe4=" />
          <PropertiesCard name="Property Name" address="Property Address" price="Property Price" image="https://media.istockphoto.com/id/1390233984/photo/modern-luxury-bedroom.jpg?s=612x612&w=0&k=20&c=po91poqYoQTbHUpO1LD1HcxCFZVpRG-loAMWZT7YRe4=" />
          <PropertiesCard name="Property Name" address="Property Address" price="Property Price" image="https://media.istockphoto.com/id/1390233984/photo/modern-luxury-bedroom.jpg?s=612x612&w=0&k=20&c=po91poqYoQTbHUpO1LD1HcxCFZVpRG-loAMWZT7YRe4=" />
          <PropertiesCard name="Property Name" address="Property Address" price="Property Price" image="https://media.istockphoto.com/id/1390233984/photo/modern-luxury-bedroom.jpg?s=612x612&w=0&k=20&c=po91poqYoQTbHUpO1LD1HcxCFZVpRG-loAMWZT7YRe4=" />
          <PropertiesCard name="Property Name" address="Property Address" price="Property Price" image="https://media.istockphoto.com/id/1390233984/photo/modern-luxury-bedroom.jpg?s=612x612&w=0&k=20&c=po91poqYoQTbHUpO1LD1HcxCFZVpRG-loAMWZT7YRe4=" />
          <PropertiesCard name="Property Name" address="Property Address" price="Property Price" image="https://media.istockphoto.com/id/1390233984/photo/modern-luxury-bedroom.jpg?s=612x612&w=0&k=20&c=po91poqYoQTbHUpO1LD1HcxCFZVpRG-loAMWZT7YRe4=" />
        </div>
      </div>
      <div className={`${styles.wishlist}`}>
        <div className={`${styles.wishlist}`}>
          <div className={`${styles.header}`}>
            <h2>Wishlist</h2>
          </div>
          <div className={`${styles.cards}`}>
            <PropertiesCard name="Property Name" address="Property Address" price="Property Price" image="https://media.istockphoto.com/id/1390233984/photo/modern-luxury-bedroom.jpg?s=612x612&w=0&k=20&c=po91poqYoQTbHUpO1LD1HcxCFZVpRG-loAMWZT7YRe4=" />
            <PropertiesCard name="Property Name" address="Property Address" price="Property Price" image="https://media.istockphoto.com/id/1390233984/photo/modern-luxury-bedroom.jpg?s=612x612&w=0&k=20&c=po91poqYoQTbHUpO1LD1HcxCFZVpRG-loAMWZT7YRe4=" />
            <PropertiesCard name="Property Name" address="Property Address" price="Property Price" image="https://media.istockphoto.com/id/1390233984/photo/modern-luxury-bedroom.jpg?s=612x612&w=0&k=20&c=po91poqYoQTbHUpO1LD1HcxCFZVpRG-loAMWZT7YRe4=" />
          </div>
        </div>
      </div>
      <div className={`${styles.notifications}`}>
        <div className={`${styles.notifications}`}>
          <div className={`${styles.header}`}>
            <h2>Notifications</h2>
          </div>
        </div>
      </div> */}
    </div>
  )
}