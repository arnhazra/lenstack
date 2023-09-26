import { Request, Response } from "express"
import crypto from "crypto"
import { MasterFrostlakeAnalyticsModel, ReplicaFrostlakeAnalyticsModel } from "./FrostlakeAnalyticsModel"
import { MasterFrostlakeProjectModel, ReplicaFrostlakeProjectModel } from "./FrostlakeProjectModel"

export default class FrostlakeController {
    async createProject(req: Request, res: Response) {
        const { name } = req.body
        const owner = req.headers.id

        try {
            const count = await MasterFrostlakeProjectModel.find({ owner }).count()

            if (count < 10) {
                const clientId = crypto.randomBytes(16).toString("hex")
                const clientSecret = crypto.randomBytes(32).toString("hex")
                const project = new MasterFrostlakeProjectModel({ owner, name, clientId, clientSecret })
                await project.save()
                const projectReplica = new ReplicaFrostlakeProjectModel({ _id: project.id, owner, name, clientId, clientSecret })
                await projectReplica.save()
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
            const projects = await MasterFrostlakeProjectModel.find({ owner: req.headers.id })
            return res.status(200).json({ projects })
        }

        catch (error) {
            return res.status(500).json({ msg: "Connection Error" })
        }
    }

    async viewProject(req: Request, res: Response) {
        try {
            const { projectId } = req.body
            const project = await MasterFrostlakeProjectModel.findById(projectId)
            const { owner } = project
            const analytics = await MasterFrostlakeAnalyticsModel.find({ projectId, owner }).select("-apiKey -owner -projectId").sort({ createdAt: -1 })

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
            const project = await MasterFrostlakeProjectModel.findById(req.params.id)

            if (project.owner.toString() === req.headers.id) {
                await MasterFrostlakeAnalyticsModel.deleteMany({ owner: req.headers.id, projectId: req.params.id })
                await MasterFrostlakeProjectModel.findByIdAndDelete(project.id)
                await ReplicaFrostlakeAnalyticsModel.deleteMany({ owner: req.headers.id, projectId: req.params.id })
                await ReplicaFrostlakeProjectModel.findByIdAndDelete(project.id)
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
            const project = await MasterFrostlakeProjectModel.findOne({ clientId, clientSecret })
            if (project) {
                if (project.owner.toString() === userId) {
                    const projectId = project.id
                    const analytics = new MasterFrostlakeAnalyticsModel({ owner: userId, projectId, component, event, info, statusCode, apiKey })
                    await analytics.save()
                    const analyticsReplica = new ReplicaFrostlakeAnalyticsModel({ _id: analytics.id, owner: userId, projectId, component, event, info, statusCode, apiKey })
                    await analyticsReplica.save()
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