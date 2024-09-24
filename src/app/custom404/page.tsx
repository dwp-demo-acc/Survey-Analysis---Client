import Link from "next/link";

const errorDict = {
  404: {
    title: 404,
    message: "This Page could Not Found.",
  },
  0: {
    title: "POC Not supported",
    message: "This data is under development and not related to this poc",
  },
};

const Custom404 = ({ code = 404, onBack }: { onBack?: () => void; code: 404 | 0 }) => {
  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
          textAlign: "center",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            gap: "1rem",
          }}
        >
          <h2> {errorDict[code].title} </h2>
          <h2 style={{ fontWeight: "500" }}> | </h2>
          <p>{errorDict[code].message}</p>
          {onBack ? (
            <button onClick={onBack}>Click here to go back</button>
          ) : (
            <Link href="/" style={{ display: "flex", flexDirection: "column" }}>
              <button>Go to Home Page</button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Custom404;
