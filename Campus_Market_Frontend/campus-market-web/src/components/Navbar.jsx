function Navbar({
    currentUser,
    showForm,
    onLoginClick,
    onLogout,
    onTogglePost
}) {

    return (
        <nav className="bg-blue-600 p-4 text-white shadow-md">
            <div className="container mx-auto flex justify-between items-center">
                <h1 className="text-2xl font-bold uppercase tracking-wider">
                    Campus Market
                </h1>
                <div className="flex gap-4 items-center">
                    {currentUser ? (
                        <>
                            <span className="text-blue-100">
                                Hi, {currentUser.username}
                            </span>

                            <button
                                onClick={onTogglePost}
                                className="bg-white text-blue-600 px-4 py-2 rounded-lg font-semibold hover:bg-blue-50 transition">
                                {showForm ? "Close" : "Post Item"}
                            </button>

                            <button
                                onClick={onLogout}
                                className="text-sm underline">
                                Logout
                            </button>
                        </>
                    ) : (
                        <button
                            onClick={onLoginClick}
                            className="bg-white text-blue-600 px-6 py-2 rounded-lg font-semibold hover:bg-blue-50 transition">
                            Login
                        </button>
                    )}
                </div>
            </div>
        </nav>
    )
}

export default Navbar;
