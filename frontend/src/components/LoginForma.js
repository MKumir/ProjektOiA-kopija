import React from "react";

const LoginForma = ({
    userLogin,
    postaviUsername,
    postaviPass,
    username,
    pass    
}) => (
    <form onSubmit={userLogin}>
        <div>
          Korisničko ime:
          <input 
            type="text" 
            value={username} 
            name="Username"
            onChange={postaviUsername}
            />
        </div>
        <div>
          Lozinka:
          <input 
            type="password" 
            value={pass} 
            name="Pass"
            onChange={postaviPass} />
        </div>
        <button type="submit">Prijava</button>
      </form>
)

export default LoginForma;
