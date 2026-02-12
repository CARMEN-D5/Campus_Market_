import {useState} from "react";

function AuthModal({
    login,
    register,
    onShow,
    loginView,
    setLoginView,

}){
    const [authData, setAuthData] = useState({username:'', password:''});
    const [loading, setLoading] = useState(false);

    const handleAuth = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            if (loginView) {
                await login(authData);
                alert("Welcome back!");
            } else {
                await register(authData);
                alert("Account created!")
            }
            onShow(false);
            setAuthData({username: '', password: ''});
        } catch (err) {
            alert(err.message || "Authentication failed!");
        } finally {
            setLoading(false);
        }
    };

    return(
        <div className="modal2-bg">
            <div
                className="absolute inset-0 bg-gray-900/60 backdrop-blur-sm"
                onClick={() => onShow(false)}
            ></div>

            <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md p-8 animate-in fade-in zoom-in duration-200">
                <button
                    onClick={() => onShow(false)}
                    className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors">
                    <span className="text-xl">×</span>
                </button>

                <h2 className="text-2xl font-bold text-gray-800 mb-6">
                    {loginView ? 'Welcome back!' : 'Join Campus Market'}
                </h2>

                <form onSubmit={handleAuth} className="space-y-5">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
                        <input
                            type="text" placeholder="Enter your username" required
                            className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transtion-all"
                            value={authData.username}
                            onChange={(e) => setAuthData({...authData, username: e.target.value})}
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                        <input
                            type="password" placeholder="••••••••" required
                            className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                            value={authData.password}
                            onChange={(e) => setAuthData({...authData, password: e.target.value})}
                        />
                    </div>

                    <button type="submit"
                            disabled={loading}
                            className="w-full bg-blue-600 text-white py-3 rounded-xl font-bold hover: bg-blue-700 transition"
                    >
                        {loading ? "Processing..." : (loginView ? 'Login' : 'Creat Account')}
                    </button>
                </form>

                <p className="mt-6 text-center text-gray-600 text-sm">
                    {loginView ? "Don't have an account? " : "Already have an account? "}
                    <button
                        onClick={() => setLoginView(!loginView)}
                        className="text-blue-600 font-bold hover:underline">
                        {loginView ? 'Sign Up' : 'Sign In'}
                    </button>
                </p>
            </div>
        </div>
    );
}

export default AuthModal;