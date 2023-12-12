const Todo = require('./Todo.js');

class TodoConroller {
    async all(req, res) {
        const filter = req.query;
        try {
            const todo = await Todo.find(filter);
            return res.json(todo);
        } catch (e) {
            res.status(500).json(e);
        }
    }

    async create(req, res) {
        try {
            const todo = await Todo.create(req.body);
            res.json(todo);
        } catch (e) {
            res.status(500).json(e);
        }
    }

    async update(req, res) {
        if (!req.params.id) throw new Error('Id not found!');
        try {
            const updatedTodo = await Todo.findByIdAndUpdate(req?.params?.id, req.body, { new: true });
            return res.json(updatedTodo);
        } catch (e) {
            res.status(500).json(e);
        }
    }

    async delete(req, res) {
        // DELETE MANY
        if (req.url.endsWith('complated')) {
            try {
                const del = await Todo.deleteMany({ 'complated': true });
                return res.json(del.deletedCount);
            } catch (e) {
                res.status(500).json(e);
            }
        } else {
            // DELETE ONE
            if (!req.params.id) {
                throw new Error('Id not found!');
            }
            try {
                const todo = await Todo.findByIdAndDelete(req?.params?.id);
                return res.json(todo);
            } catch (e) {
                res.status(500).json(e);
            }
        }
    }
}

module.exports = new TodoConroller();