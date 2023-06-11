import coockieConfig from "@/helpers/cookieConfig";
import { withIronSessionApiRoute } from "iron-session/next";

export default withIronSessionApiRoute(
    async function registRoute(req, res) {
        const request  = await fetch("https://cute-lime-goldfish-toga.cyclic.app/auth/register", {
            method: "POST",
            body: new URLSearchParams(req.body).toString(),
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            }
        });

        const respons = await request.json();
        const token = respons?.results?.token;
        if(token){
            req.session.token = token;
            await req.session.save();
        }
        return res.json(respons);
    },
    coockieConfig
);