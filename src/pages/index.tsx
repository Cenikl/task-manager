import { GetServerSideProps } from "next";
import Head from "next/head";
import { useRouter } from "next/router";

/**
  Calculates the time difference between the server time and client time.
  @param {Date} serverTime - The server time.
  @param {Date} clientTime - The client time.
  @returns {string} The time difference in the format "{days} days, {hours} hours, {minutes} minutes, {seconds} seconds".
*/

export const getServerSideProps :  GetServerSideProps = async (context) =>{
  const serverDate = new Date().toString();
  return {
    props:{
      serverDate
    },
}

}

const calculateTimeDifference = (server: Date, client: Date) => {
  const day = server.getDay() - client.getDay();
  const hour = client.getHours() - server.getHours();
  const minutes = server.getMinutes() - client.getMinutes();
  const secondes = client.getSeconds() - server.getSeconds();
  return `Day: ${day} \nHours: ${hour} \nMinutes: ${minutes} \nSecondes: ${secondes}`;
};

const getClientTime = () => {
  return new Date();
}

const displayTime = (clientDate:Date) => {
  const day = String(clientDate.getDate()).padStart(2, '0');
  const month = String(clientDate.getMonth() + 1).padStart(2, '0');
  const year = String(clientDate.getFullYear());
  const hours = String(clientDate.getHours()).padStart(2, '0');
  const minutes = String(clientDate.getMinutes()).padStart(2, '0');
  return `${day}-${month}-${year} ${hours}:${minutes}`;
}

export default function Home(serverDate : any) {
  const router = useRouter();
  const serverTime = new Date(serverDate.serverDate);
  const moveToTaskManager = () => {
    router.push("/tasks");
  }
  return (
    <>
      <Head>
        <title>Web 2 - Exam TD</title>
        <meta name="description" content="Just an exam" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <h1>The easiest exam you will ever find</h1>
        <div>
          <p>
            Server time:{" "}
            <span className="serverTime">{displayTime(serverTime)}</span>
          </p>
          <p>
            Time diff:{" "}
            <span className="serverTime">{calculateTimeDifference(serverTime,getClientTime())}</span>
          </p>
        </div>
        <div>
          <button onClick={moveToTaskManager}>Go to task manager</button>
        </div>
      </main>
    </>
  );
}
