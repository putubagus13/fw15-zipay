import coockieConfig from "@/helpers/cookieConfig";
import { withIronSessionApiRoute } from "iron-session/next";

export default withIronSessionApiRoute(
    async function forgotRoute(req, res) {
        const request  = await fetch("https://outstanding-train-fawn.cyclic.app/auth/forgot-password", {
            method: "POST",
            body: new URLSearchParams(req.body).toString(),
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            }
        });

        const respons = await request.json();
        return res.json(respons);
    },
    coockieConfig
);