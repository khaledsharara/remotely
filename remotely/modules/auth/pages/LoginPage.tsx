function LoginPage() {
  return (
    <div className="w-full h-screen">
      <div className="bg-gradient-to-l from-primary to-70% w-full h-full flex flex-col gap-2 justify-center items-center">
        <div className="mb-8 text-title text-white">Log In</div>
        <input
          className="mt-1 w-[25%] px-3 py-2 border-0 border-b-2 border-primary bg-transparent"
          type="email"
          // value={email}
          // onChange={(e) => handleEmailChange({ e, setEmail })}
          placeholder="Email"
        />
        <input
          className="mt-1 w-[25%] px-3 py-2 border-0 border-b-2 border-primary bg-transparent focus:outline-none"
          type="password"
          // value={password}
          // onChange={(e) => handlePasswordChange({ e, setPassword })}
          placeholder="Password"
        />
        {/* {responseObj.error?.message !== "" && ( */}
        {/* <div className="text-red-500">{responseObj.error?.message}</div> */}
        {/* )} */}
        {/* {responseObj.loading && <div>Loading...</div>} */}

        <button
          // ref={loginButtonRef}
          className="mt-1 w-[25%] px-3 py-2 bg-primary text-white border border-0 rounded-xl active:bg-primary-dark active:shadow-lg"
          type="submit"
          // onClick={(e) =>
          //   handleSubmit({
          //     e,
          //     email,
          //     password,
          //     responseObj,
          //     setResponseObj,
          //   })
          // }
        >
          Log In
        </button>
      </div>
    </div>
  );
}

export default LoginPage;
