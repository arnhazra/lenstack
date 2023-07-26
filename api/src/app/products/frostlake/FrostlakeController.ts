import { Request, Response } from "express"
import crypto from "crypto"
import FrostlakeAnalyticsModel from "./FrostlakeAnalyticsModel"
import FrostlakeProjectModel from "./FrostlakeProjectModel"

export default class FrostlakeController {
    async createProject(req: Request, res: Response) {
        const { name } = req.body
        const owner = req.headers.id

        try {
            const count = await FrostlakeProjectModel.find({ owner }).count()

            if (count < 10) {
                const clientId = crypto.randomBytes(16).toString("hex")
                const clientSecret = crypto.randomBytes(32).toString("hex")
                const project = new FrostlakeProjectModel({ owner, name, clientId, clientSecret })
                await project.save()
                return res.status(200).json({ msg: "New Project Created", project })
            }

            else {
                return res.status(400).json({ msg: "Project Limit Reached" })
            }
        }

        catch (error) {
            return res.status(500).json({ msg: "Error Creating Project" })
        }
    }

    async getProjects(req: Request, res: Response) {
        try {
            const projects = await FrostlakeProjectModel.find({ owner: req.headers.id })
            return res.status(200).json({ projects })
        }

        catch (error) {
            return res.status(500).json({ msg: "Connection Error" })
        }
    }

    async viewProject(req: Request, res: Response) {
        try {
            const { projectId } = req.body
            const project = await FrostlakeProjectModel.findById(projectId)
            const { owner } = project
            const analytics = await FrostlakeAnalyticsModel.find({ projectId, owner }).sort({ date: -1 }).select("-apiKey -owner -projectId")

            if (owner.toString() === req.headers.id) {
                return res.status(200).json({ project, analytics })
            }

            else {
                return res.status(404).json({ msg: "Project Not Found" })
            }
        }

        catch (error) {
            return res.status(404).json({ msg: "Project Not Found" })
        }
    }

    async deleteProject(req: Request, res: Response) {
        try {
            const project = await FrostlakeProjectModel.findById(req.params.id)

            if (project.owner.toString() === req.headers.id) {
                await FrostlakeProjectModel.deleteMany({ owner: req.headers.id, projectId: req.params.id })
                await FrostlakeProjectModel.findByIdAndDelete(project.id)
                return res.status(200).json({ msg: "Project Deleted" })
            }

            else {
                return res.status(404).json({ msg: "Project Not Found" })
            }
        }

        catch (err) {
            return res.status(404).json({ msg: "Project Not Found" })
        }
    }

    async createAnalytics(req: Request, res: Response) {
        const { component, event, info, statusCode, apiKey, clientId, clientSecret } = req.body

        try {
            const userId = req.headers.id
            const project = await FrostlakeProjectModel.findOne({ clientId, clientSecret })
            if (project) {
                if (project.owner.toString() === userId) {
                    const projectId = project.id
                    const analytics = new FrostlakeAnalyticsModel({ owner: userId, projectId, component, event, info, statusCode, apiKey })
                    await analytics.save()
                    return res.status(200).json({ msg: "Analytics created" })
                }

                else {
                    return res.status(500).json({ msg: "Error creating analytics" })
                }
            }

            else {
                return res.status(500).json({ msg: "Error creating analytics" })
            }
        }

        catch (error) {
            return res.status(500).json({ msg: "Error creating analytics" })
        }
    }
}