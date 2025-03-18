import express from "express"

const router = express.Router()

router.get("/", async (req, res) => {
    if (req.session.views) {
      req.session.views++
    } else {
      req.session.views = 1
    }
    res.render("index.njk",
      { title: "Test", message: "Funkar?", views: req.session.views }
    )
  })

export default router