export const adminDoLogin=(id)=>{
    localStorage.setItem("id", id);
    localStorage.setItem("adminLoggedIn", true)
};

export const adminIsLogin=()=>{
    return Boolean(localStorage.getItem("adminLoggedIn"))
};

export const adminLogOut=(props)=>{
    localStorage.removeItem("id");
    localStorage.removeItem("adminLoggedIn");
    props.history.push("/admin/signin");
}

export const agentDoLogin=(id)=>{
    localStorage.setItem("id", id);
    localStorage.setItem("agentLoggedIn", true)
};

export const agentIsLogin=()=>{
    return Boolean(localStorage.getItem("agentLoggedIn"))
};

export const agentLogOut=(props)=>{
    localStorage.removeItem("id");
    localStorage.removeItem("agentLoggedIn");
    props.history.push("/agent/signin");
}