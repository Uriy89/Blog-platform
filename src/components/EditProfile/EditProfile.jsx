import React from "react";
import style from "./EditProfile.module.css";

const EditProfile = () => {
    return (
      <section className={style.editProfile}>
        <div className={style.wrapper}>
          <h2 className={style.title}>Create new account</h2>
          <form action="" className={style.form}>
            <label htmlFor="username" className={style.label}>Username</label>
            <input type="text" name="username" placeholder="Username" className={style.input}/>
            <label htmlFor="email" className={style.label}>Email address</label>
            <input type="text" name="email" placeholder="Email" className={style.input}/>
            <label htmlFor="password" className={style.label}>New password</label>
            <input type="text" name="password" placeholder="New password" className={style.input}/>
            <label htmlFor="avatar" className={style.label}>Avatar image (url)</label>
            <input type="text" name="avatar" placeholder="Avatar image" className={style.input}/>
            <button className={style.save}>Save</button>
          </form>
        </div>
      </section>
    );
}

export default EditProfile;
