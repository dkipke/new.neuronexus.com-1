const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const mongooseAggregatePaginate = require('mongoose-aggregate-paginate');

const status = ['Active', 'Inactive'];

const science_update_collaboration_tabsSchema = new Schema({
  title: { type: String, default: '' },
  content: { type: String, default: '' },
  isDeleted: { type: Boolean, default: false, enum: [true, false] },
  status: { type: String, default: 'Active', enum: status },
}, { timestamps: true });

// For pagination
science_update_collaboration_tabsSchema.plugin(mongooseAggregatePaginate);

// create the model for CMS and expose it to our app
module.exports = mongoose.model('science_update_collaboration_tabs', science_update_collaboration_tabsSchema);