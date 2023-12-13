import { Process, Processor } from '@nestjs/bull';
import { Logger } from '@nestjs/common';
import { Job } from 'bull';
import { EventsGateway } from 'src/events/events.gateway';

@Processor('messages')
export class MessageProcessor {
  private readonly logger = new Logger(MessageProcessor.name);

  constructor(private readonly eventsGateway: EventsGateway) {
    console.log('begin messages');
  }

  @Process('transcode')
  handleTranscode(job: Job) {
    this.logger.debug(
      `Start transcoding room ${job.data.message.channelId}...`,
    );
    this.logger.debug(job.data);
    this.eventsGateway.server
      .to(job.data.message.channelId)
      .emit('message', job.data.message);
    this.logger.debug('Transcoding completed');
  }
}
